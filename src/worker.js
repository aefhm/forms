export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    console.log('Worker received request:', {
      method: request.method,
      pathname,
      url: request.url
    });

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Handle form submissions at /submit
    if (request.method === "POST" && pathname === "/submit") {
      try {
        console.log('Processing form submission');
        const data = await request.json();
        console.log('Form data:', data);
        
        if (!data.name) {
          return new Response(JSON.stringify({ message: 'Name is required' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        // Insert into D1 database
        await env.DB.prepare(
          `INSERT INTO connections (name, prayer, address, created_at) 
           VALUES (?, ?, ?, ?)`
        ).bind(
          data.name,
          data.prayer || null,
          data.address || null,
          new Date().toISOString()
        ).run();

        return new Response(JSON.stringify({ message: 'Form submitted successfully' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });

      } catch (error) {
        console.error('Error processing form:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // Serve static files from /dist
    if (request.method === "GET") {
      try {
        const filePath = pathname === "/" ? "/index.html" : pathname;
        console.log('Serving static file:', filePath);
        return await env.ASSETS.fetch(new Request("http://localhost" + filePath));
      } catch (e) {
        console.error('Error serving static file:', e);
        return new Response("Not found", { status: 404 });
      }
    }

    console.log('Method not allowed:', request.method);
    return new Response("Method not allowed", { status: 405 });
  }
}; 