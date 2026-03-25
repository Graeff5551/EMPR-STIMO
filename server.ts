import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for CPF Consultation
  app.get("/api/consulta-cpf", async (req, res) => {
    const { cpf } = req.query;
    const cleanCpf = (cpf as string)?.replace(/\D/g, '');
    const apiKey = process.env.CPF_API_KEY;
    
    if (!apiKey) {
      console.error('CPF_API_KEY is not set in environment variables.');
      return res.status(500).json({ error: "Configuração incompleta: Chave API não encontrada. Por favor, insira sua chave nas configurações." });
    }

    if (!cleanCpf) {
      return res.status(400).json({ error: "CPF é obrigatório" });
    }

    // Mock for testing if someone uses a specific test CPF
    if (cleanCpf === '00000000000' || cleanCpf === '12345678901') {
      return res.json({
        nome: "Usuário de Teste Vaidabom",
        data_nascimento: "01/01/1990",
        status: "success"
      });
    }

    try {
      // Try with header first, then fallback to query param if needed
      const apiUrl = `https://apicpf.com/api/consulta?cpf=${cleanCpf}&token=${apiKey}`;
      console.log('Calling API:', `https://apicpf.com/api/consulta?cpf=${cleanCpf}&token=***`);
      
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Accept": "application/json"
        }
      });

      const data: any = await response.json();
      console.log('Server API Response for CPF:', cleanCpf, JSON.stringify(data));

      // Handle different API response formats
      // Some APIs return status: 1 for success, others status: "success"
      const isSuccess = data.status === 1 || data.status === "success" || data.status === "1" || (!data.error && !data.message && data.nome);
      
      if (!response.ok || data.error || (data.status !== undefined && !isSuccess)) {
        const errorMsg = data.message || data.error || data.msg || "CPF não encontrado ou dados incompletos.";
        return res.status(response.status || 400).json({ 
          error: errorMsg 
        });
      }

      // Deep search for name and birth date in case they are nested (e.g., in data.dados or data.result)
      const findField = (obj: any, fields: string[]): string => {
        for (const field of fields) {
          if (obj[field]) return obj[field];
        }
        // Check one level deep
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            for (const field of fields) {
              if (obj[key][field]) return obj[key][field];
            }
          }
        }
        return "";
      };

      const nameFields = ['nome', 'name', 'NOME', 'full_name', 'nome_completo', 'Nome'];
      const birthFields = ['data_nascimento', 'nascimento', 'DATA_NASCIMENTO', 'birth_date', 'data_nasc', 'Nascimento'];

      const rawBirthDate = findField(data, birthFields);
      
      // Helper to format date to DD/MM/YYYY
      const formatDate = (dateStr: string): string => {
        if (!dateStr) return "";
        // If already DD/MM/YYYY
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
        
        // If YYYY-MM-DD
        const ymdMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (ymdMatch) return `${ymdMatch[3]}/${ymdMatch[2]}/${ymdMatch[1]}`;
        
        // If YYYYMMDD
        const ymdSimpleMatch = dateStr.match(/^(\d{4})(\d{2})(\d{2})$/);
        if (ymdSimpleMatch) return `${ymdSimpleMatch[3]}/${ymdSimpleMatch[2]}/${ymdSimpleMatch[1]}`;

        // If DDMMYYYY
        const dmySimpleMatch = dateStr.match(/^(\d{2})(\d{2})(\d{4})$/);
        if (dmySimpleMatch) return `${dmySimpleMatch[1]}/${dmySimpleMatch[2]}/${dmySimpleMatch[3]}`;
        
        return dateStr;
      };

      const result = {
        nome: findField(data, nameFields),
        data_nascimento: formatDate(rawBirthDate),
        status: "success"
      };

      if (!result.nome) {
        console.error('Name not found in API response:', JSON.stringify(data));
        return res.status(404).json({ 
          error: "CPF encontrado, mas o nome não foi retornado pela API.",
          debug: data // Send back for debugging if needed (careful with PII in production, but here it helps)
        });
      }

      res.json(result);
    } catch (error) {
      console.error("Server API Error:", error);
      res.status(500).json({ error: "Erro interno no servidor ao consultar CPF." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
