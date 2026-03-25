import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import crypto from "crypto";

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
        nome: "Usuário de Teste Bancred",
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

  // API Route for Payment Creation (Carteira do 7)
  app.post("/api/create-payment", async (req, res) => {
    const { amount, name, cpf } = req.body;
    const apiKey = process.env.PAYMENT_API_KEY;
    const apiSecret = process.env.PAYMENT_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.log('PAYMENT_API_KEY or PAYMENT_API_SECRET is missing!');
      return res.status(500).json({ error: "Configuração de pagamento incompleta: Chave API ou Secret não encontrados nas configurações." });
    }

    try {
      const cleanCpf = cpf?.replace(/\D/g, '');
      const body = JSON.stringify({
        amount: amount, // Decimal value as per user example (e.g. 150.00)
        externalId: `loan_${Date.now()}`,
        callbackUrl: "https://ais-dev-eddskd3cyrop52jvkm4daw-391214972009.us-east1.run.app/api/webhook",
        description: "Tarifa de Seguro Bancred",
        payer: {
          name: name,
          document: cleanCpf
        }
      });

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = crypto.createHmac("sha256", apiSecret)
        .update(timestamp + "." + body)
        .digest("hex");

      console.log('Creating payment for:', { name, amount, cpf: cleanCpf });
      console.log('Using API Key (first 4 chars):', apiKey.substring(0, 4) + '...');
      console.log('Fetching from URL: https://api.carteirado7.com/v2/payment/create');

      const response = await fetch("https://api.carteirado7.com/v2/payment/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-C7-Timestamp": timestamp,
          "X-C7-Signature": signature
        },
        body: body
      });

      const responseText = await response.text();
      console.log('Payment API Raw Response:', responseText);

      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse payment API response as JSON:', responseText);
        throw new Error(`A API retornou um formato inesperado (HTML/Texto). Verifique se a URL está correta. Resposta: ${responseText.substring(0, 100)}...`);
      }

      console.log('Payment API Response Status:', response.status);
      console.log('Payment API Response Data:', JSON.stringify(data));

      if (!response.ok) {
        throw new Error(data.message || data.error || `Erro da API (${response.status}): ${JSON.stringify(data)}`);
      }

      // Return the QR Code data and copy-paste code
      // We try to find the code and qrcode in common fields
      const pixCode = data.payment?.pixCopiaECola || data.payment?.code || data.code || data.pix_code || data.copy_paste;
      const pixQrCode = data.payment?.qrCodeBase64 || data.payment?.qrCode || data.payment?.qrcode || data.qrcode || data.qr_code || data.base64;

      if (!pixCode) {
        throw new Error(`A API não retornou um código PIX válido. Resposta: ${JSON.stringify(data)}`);
      }

      res.json({
        qrcode: pixQrCode,
        code: pixCode,
        id: data.payment?.id || data.id || data.external_id || data.txid
      });
    } catch (error) {
      console.error("Payment Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro interno ao processar pagamento.";
      res.status(500).json({ error: errorMessage });
    }
  });

  // API Route for Payment Status (Carteira do 7)
  app.get("/api/payment-status/:id", async (req, res) => {
    const { id } = req.params;
    const apiKey = process.env.PAYMENT_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Configuração de pagamento incompleta." });
    }

    try {
      console.log(`Checking status for payment: ${id}`);
      const response = await fetch(`https://api.carteirado7.com/v2/payment/${id}/status`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json"
        }
      });

      const data: any = await response.json();
      console.log(`Status response for ${id}:`, JSON.stringify(data));

      if (!response.ok) {
        throw new Error(data.message || data.error || `Erro ao consultar status (${response.status})`);
      }

      // The API returns { ok: true, payment: { status: 'pending' | 'approved' | 'rejected', ... } }
      res.json({
        status: data.payment?.status || 'pending',
        ok: data.ok
      });
    } catch (error) {
      console.error("Status Check Error:", error);
      res.status(500).json({ error: "Erro ao verificar status do pagamento." });
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
