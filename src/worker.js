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

        // Handle different form types
        if (data.formType === 'prayer') {
          // Insert into connections table for prayer requests
          await env.DB.prepare(
            `INSERT INTO connections (name, prayer, address, created_at) 
             VALUES (?, ?, ?, ?)`
          ).bind(
            data.name,
            data.prayer || null,
            data.address || null,
            new Date().toISOString()
          ).run();
        } else if (data.formType === 'postcard') {
          // Insert into connections table for postcard requests
          await env.DB.prepare(
            `INSERT INTO connections (name, prayer, address, created_at, content)
             VALUES (?, ?, ?, ?, ?)`
          ).bind(
            data.name,
            null, // no prayer for postcard requests
            data.address || null,
            new Date().toISOString(),
            data.content || null
          ).run();
        } else if (data.formType === 'survey') {
          // Insert into surveys table for "What Makes You Go Ugh" survey
          await env.DB.prepare(
            `INSERT INTO surveys (name, email, role, time_spikes, workflow_friction,
             annoyances_priorities, dream_solution, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            data.name,
            data.email || null,
            data.role || null,
            data.time_spikes || null,
            data.workflow_friction || null,
            data.annoyances_priorities || null,
            data.dream_solution || null,
            new Date().toISOString()
          ).run();
        } else if (data.formType === 'intro') {
          // Insert into intros table for referral/intro forms
          await env.DB.prepare(
            `INSERT INTO intros (person_name, person_contact, referrer_name, referrer_email,
             connection_type, description, is_self_referral, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            data.person_name,
            data.person_contact || null,
            data.name || null, // referrer name (null for self-referrals)
            data.email || null, // referrer email (null for self-referrals)
            data.connection_type,
            data.description,
            data.self_referral === 'on' ? 1 : 0, // checkbox value
            new Date().toISOString()
          ).run();
        } else {
          // Fallback for legacy submissions without formType
          await env.DB.prepare(
            `INSERT INTO connections (name, prayer, address, created_at) 
             VALUES (?, ?, ?, ?)`
          ).bind(
            data.name,
            data.prayer || null,
            data.address || null,
            new Date().toISOString()
          ).run();
        }

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
      console.log('GET request for:', pathname);

      // Always serve index.html for routes without file extensions (except root)
      if (!pathname.includes('.') && pathname !== '/') {
        console.log('SPA route - serving index.html for:', pathname);
        const indexUrl = new URL(request.url);
        indexUrl.pathname = '/index.html';
        return await env.ASSETS.fetch(indexUrl.toString());
      }

      // For root and files with extensions
      console.log('Serving:', pathname === '/' ? 'index.html (root)' : pathname);
      return await env.ASSETS.fetch(request);
    }

    console.log('Method not allowed:', request.method);
    return new Response("Method not allowed", { status: 405 });
  }
};
