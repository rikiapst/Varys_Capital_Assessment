const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

function getImportsAndContracts(dataContent) {
  let imports = [];
  let contracts = [];
  let line, items;
  for(let i = 0; i < dataContent.length; i++){
    line = dataContent[i];
    items = line.split(" ");
    if(items[0] == "import"){
      imports.push(items[1].replace(";", "").replace(/"/g, ""))
    }
    for(let j = 0; j < items.length; j++){
      if(items[j] == "contract"){
        contracts.push(items[j + 1])
      }
    }
  }
  return  {
    import: imports,
    contracts: contracts
  }
}


app.post(
  '/analyze', async (req, res) => {
    let data = req.body.code;
    let dataContent = data.split('\n');
    let results = getImportsAndContracts(dataContent);
    res.send(
      results
    );
  }
)

app.listen(3001, () => console.log('Listening at Port 3001'));
