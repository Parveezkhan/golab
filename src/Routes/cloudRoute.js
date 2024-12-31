const express  = require('express')
const {createLab} = require('../Controllers/labController')

const Router = require("express")
const router = Router()

router.post('/labconfig',createLab)
router.post('/python/aws', (req, res) => {
    console.log('connecting')
    const { services, users, days, hours } = req.body;
    const args = [services, users, days, hours];
    const pythonProcess = spawn('python', ['aws.py', ...args]);
  
    let result = '';
  
    // Capture the output of the Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log('output produced')
      function formatOutput(output) {
        // Replace \r\n with actual newlines
        const formattedOutput = output.replace(/\r\n/g, '\n');
        return formattedOutput;
    }
      result += formatOutput(data.toString()); // Accumulate the script's output
      console.log(`stdout: ${data}`);
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`AWS process exited with code ${code}`);
      if (code === 0) {
        // Send the accumulated result once the process exits
        res.json({ message: 'Python script executed successfully', result });
      } else {
        res.status(500).json({ error: 'Python script execution failed' });
      }
    });
  
    

  //  Set a timeout for the process (e.g., 30 seconds)
//    setTimeout(() => {
//     pythonProcess.kill();
//     res.status(500).send({ error: 'Python script execution timed out.' });
// }, 30000); 

});

module.exports = router;