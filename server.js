/*
 npm install --save express cors morgan
 */

const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const path = require('path');

const app = express();
app.use(morgan('tiny'));
app.use(cors());

const name = 'happy_story';
// const jsonFile = (name) => path.join(__dirname, './data', `${name}.json`);

const jsonFile = path.join(__dirname, '/data/stories/1', `${name}.json`);
//
// const jsonFILE = path.join(__dirname, './data', `${name}.json`);

console.log(`jsonFile is ${jsonFile}`);

//const jsonFile = (name) => path.join('/data', `${name}.json`);

/*
  to get started

  mkdir data
  touch main_characters.json

  then write some character data into the file

  [
    {
      "id": 1,
      "name": "Bear"
    },
    {
      "id": 2,
      "name": "The Magic Toaster"
    }
  ]
*/
app.use(express.static('public'));
app.use(morgan('combined'));

console.log("the path is " + __dirname);

console.log

app.get('/api/stories', (req, res) => {
  // res.sendFile('/data/stories/1/happy_story.json');
  res.sendFile(jsonFile);
});


/*
  to get stories add some some data for each character

    mkdir -p data/main_characters/{1,2}

    touch data/main_characters/{1,2}/{sad,happy}_story.json

  then write some data into each story file

  for example
    /data/main_characters/1/happy_story.json

  Would have

    {
      "id": 1,
      "story_type": "happy"
      "main_character_id": 1,
      "text": "Bear went to the store. Bear looked for milk. The store gave out free milk."
    }

  And for a happy sad you'd have

    {
      "id": 2,
      "story_type": "sad",
      "main_character_id": 1,
      "text": "Bear went to the store. Bear looked for milk. The store was out of milk."
    }

   in the data/main_character/1/sad_story.json
  */

app.get('stories/:id/sad_story', (req, res) => {
  const id = req.params.id;
  // console.log("root is " + root);
  // res.sendFile('data/main_characters/1/sad_story')
  res.sendFile("data/stories/1/sad_story.json", { root: path.join(__dirname, 'public') })

})

app.get('stories/:id/happy_story', (req, res) => {
  const id = req.params.id;
  // res.sendFile(jsonFile('data/main_characters/1/happy_story'))
  // res.sendFile("happy_story.json", { root: path.join(__dirname, 'public') })
  res.sendFile("data/stories/1/happy_story.json", { root: path.join(__dirname, 'public') })
})

/*
app.get('*', function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, 'public') })
})
*/


app.listen(PORT, () => {
  console.log('STARTING ON', PORT);
});
