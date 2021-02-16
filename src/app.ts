import express from 'express';
 
const app = express();
const port = 3000;


function CompareFiles(){
    alert("Compare files API"); 
 
}

app.get('/PDFCompare', (req, res) => {
    res.send(CompareFiles());
  });
 
app.listen(port, () =>{
  return console.log(`server is listening on ${port}`);
});