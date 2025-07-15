const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha3NoYXlha2t1NzMwMEBnbWFpbC5jb20iLCJleHAiOjE3NTI1NTk2NDEsImlhdCI6MTc1MjU1ODc0MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImY1ODk5NDhhLTVjNzItNGFiMC05ZjQxLTgxY2IzYWJlYWZiNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFrc2hheSBiYXJ0d2FsIiwic3ViIjoiMDE1NzU0OTItYTBlZS00NDg1LTllZjgtZDJiZTRhN2QxYzUwIn0sImVtYWlsIjoiYWtzaGF5YWtrdTczMDBAZ21haWwuY29tIiwibmFtZSI6ImFrc2hheSBiYXJ0d2FsIiwicm9sbE5vIjoiMjIxODI4OCIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6IjAxNTc1NDkyLWEwZWUtNDQ4NS05ZWY4LWQyYmU0YTdkMWM1MCIsImNsaWVudFNlY3JldCI6IkNXUXZ3RVJ0ZlNncmF6RUcifQ.ECiyjRuEW2QsC8re-5Nm7R1I9EfIISAIv5EYKI0tMAE";
async function Log(req, res, next) {
  const { stack, level, package:pkg, message } = req.body;

  // Validate all 4 fields are present
  if (!stack || !level || !pkg || !message) {
    return res.status(400).json({ error: "Missing required fields " });
  }

  try {
    const apiResponse = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    const responseText = await apiResponse.text(); 

    return res.status(apiResponse.status).send(responseText);

  } catch (err) {
    console.error("⚠️ Failed to forward log:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports=Log;
