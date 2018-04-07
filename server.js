/*
 npm install --save express cors morgan
 */

const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();
app.use(morgan('tiny'));
app.use(cors());

let name = 'sad_story';
// const textFile = (name) => path.join(__dirname, './data', `${name}.text`);

let textFile = path.join(__dirname, '/data/stories/1', `${name}.text`);
//
// const textFILE = path.join(__dirname, './data', `${name}.text`);

console.log(`textFile is ${textFile}`);

//const textFile = (name) => path.join('/data', `${name}.text`);

/*
  to get started

  mkdir data
  touch main_characters.text

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
  // res.sendFile('/data/stories/1/happy_story.text');
  res.sendFile(textFile);
});


/*
  to get stories add some some data for each character

    mkdir -p data/main_characters/{1,2}

    touch data/main_characters/{1,2}/{sad,happy}_story.text

  then write some data into each story file

  for example
    /data/main_characters/1/happy_story.text

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

   in the data/main_character/1/sad_story.text
  */

// app.get('api/stories/1/sad_story', (req, res) => {
  // const id = req.params.id;
  // console.log("root is " + root);
  // res.sendFile('data/main_characters/1/sad_story')
  // res.sendFile("data/stories/1/sad_story.text") })
  // , { root: path.join(__dirname, 'public') })

// })

app.get('/api/stories/:id/sad_story', (req, res) => {
  const id = req.params.id;
  // res.sendFile(`/data/stories/${id}/sad_story.text`)
  // res.sendFile(textFile)
  res.sendFile(path.join(__dirname, `data/stories/${id}/sad_story.text`));
})

app.get('/api/stories/:id/happy_story', (req, res) => {
  const id = req.params.id;
  //let story = 'happy_story';
  // let txtFile = (story) => path.join(__dirname, './data', `${story}.text`);
  // console.log(txtFile);
  res.sendFile(path.join(__dirname, `data/stories/${id}/happy_story.text`));
})


// app.get('api/stories/1/happy_story', (req, res) => {
  // const id = req.params.id;
  // res.sendFile(textFile('data/main_characters/1/happy_story'))
  // res.sendFile("happy_story.text", { root: path.join(__dirname, 'public') })
  // res.sendFile("data/stories/1/happy_story.text") })
  // , { root: path.join(__dirname, 'public') })
// })

/*
app.get('*', function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, 'public') })
})
*/


app.listen(PORT, () => {
  console.log('STARTING ON', PORT);
});
