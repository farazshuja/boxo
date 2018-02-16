import shortid from 'shortid'
let Engine = {
  getLevel(stages, level) {    
    return stages.Levels.filter( s => s.level === level)[0];
  },
  getBoxes(level) {
    let boxes = [];    
    let totalRows = level.map.length;
    for(let row=0; row<totalRows; row++) {
      let totalColumns = level.map[row].length;
      for(let col=0; col<totalColumns; col++) {
        let type = level.map[row][col];
        if(type !== 0) {
          boxes.push({
            id: shortid.generate(),
            index: boxes.length,
            position: {
              row,
              col
            },
            type
          })
        }
      }
    }    
    return boxes;
  },
  isNextEmpty(row, col, level) {        
    if (typeof level.map[row] !== 'undefined' && typeof level.map[row][col] !== 'undefined') {      
      return level.map[row][col] === 0;
    }
    return false;
  },
  stepRight(level, boxes, selectedBox) {    
    let nextRow = selectedBox.position.row;
    let nextCol = selectedBox.position.col + 1;
    let boxAbove = this.getBoxAbove(boxes, selectedBox);

    if (this.isNextEmpty(nextRow, nextCol, level) && !selectedBox.isFreeFalling) {
      selectedBox.position.col++; //update box      
      this.updateLevelsMap(level, nextRow, (nextCol-1), nextRow, nextCol); //update level's map
      this.handleFreeFall(level, boxes, selectedBox);
      this.fallReaction(level, boxes, boxAbove);
      
      setTimeout(() => this.blastReaction(level, boxes, selectedBox), 100);
    }
  },
  stepLeft(level, boxes, selectedBox) {    
    let nextRow = selectedBox.position.row;
    let nextCol = selectedBox.position.col - 1;
    let boxAbove = this.getBoxAbove(boxes, selectedBox);

    if (this.isNextEmpty(nextRow, nextCol, level) && !selectedBox.isFreeFalling) {
      selectedBox.position.col--; //update box      
      this.updateLevelsMap(level, nextRow, (nextCol+1), nextRow, nextCol) //update level's map
      this.handleFreeFall(level, boxes, selectedBox);
      this.fallReaction(level, boxes, boxAbove);

      setTimeout(() => this.blastReaction(level, boxes, selectedBox), 100);
    }
  },
  updateLevelsMap(level, row1, col1, row2, col2) {
    let map2d = level.map;
    let v1 = map2d[row1][col1];
    let v2 = map2d[row2][col2];
    map2d[row1][col1] = v2;
    map2d[row2][col2] = v1;
  },
  // Find if there is no box under current box i.e. cBox then play free fall effect   
  handleFreeFall(level, boxes, selectedBox) {    
    let nextRow = selectedBox.position.row + 1;

    if(level.map[nextRow][selectedBox.position.col] === 0) {
      selectedBox.isFreeFalling = true;
      setTimeout(() => {
        selectedBox.position.row++;        
        this.updateLevelsMap(level, (nextRow-1), selectedBox.position.col, nextRow, selectedBox.position.col); //update level's data
        this.handleFreeFall(level, boxes, selectedBox);  
        
        setTimeout(() => this.blastReaction(level, boxes, selectedBox), 100);
      }, 100)
    }
    else {
      selectedBox.isFreeFalling = false;
    }
  },
  // see all 4 sides of a box and remove it if they are of same type
  blastReaction(level, boxes, box) {    
    let adjacentBoxes = this.getAdjacentBoxes(boxes, box);
    let anyOneBlasted = false;
    Object.keys(adjacentBoxes).forEach((b) => {            
      if(box.type === adjacentBoxes[b].type) {        
        level.map[adjacentBoxes[b].position.row][adjacentBoxes[b].position.col] = 0;
        if(adjacentBoxes[b].type > 1) {
          level.boxes--;
        }
        adjacentBoxes[b].type = 0;
        anyOneBlasted = true;
      }
    });

    if(anyOneBlasted) {
      level.map[box.position.row][box.position.col] = 0;
      if(box.type > 1) {
        level.boxes--;
      }
      box.type = 0;
    }
  },
  // get the box at row-col, find if its lower box is empty free fall it
  // call the same for upper box until there is no box over or there is a wall
  fallReaction(level, boxes, box) {
    //debugger;
    if(!box || box.type === 1) {
      return;
    }
    //free fall this box
    setTimeout(() => {
      box.position.row++;        
      this.updateLevelsMap(level, (box.position.row-1), box.position.col, box.position.row, box.position.col); //update level's data
      this.handleFreeFall(level, boxes, box);        
    }, 100)

    //check the upper box if any
    this.fallReaction(level, boxes, this.getBoxAbove(boxes, box));
  },
  // return the box thats above the current box or null
  getBoxAbove(boxes, box) {
    let boxAbove = null;

    if(!box) {
      return null;
    }

    for(let x=0; x<boxes.length; x++) {
      if(boxes[x].position.row === box.position.row-1 && boxes[x].position.col === box.position.col) {
        boxAbove = boxes[x];
        break;
      }
    }

    return boxAbove;

  },
  getAdjacentBoxes(boxes, box) {
    let adjacentBoxes = {};

    if(!box) {
      return null;
    }

    for(let x=0; x<boxes.length; x++) {
      //above box
      if(boxes[x].position.row === box.position.row-1 && boxes[x].position.col === box.position.col) {
        adjacentBoxes.above = boxes[x];
      }
      //below box
      else if(boxes[x].position.row === box.position.row+1 && boxes[x].position.col === box.position.col) {
        adjacentBoxes.below = boxes[x];        
      }
      //left box
      else if(boxes[x].position.row === box.position.row && boxes[x].position.col === box.position.col-1) {
        adjacentBoxes.left = boxes[x];
      }
      //right box
      else if(boxes[x].position.row === box.position.row && boxes[x].position.col === box.position.col+1) {
        adjacentBoxes.right = boxes[x];
      }
    }

    return adjacentBoxes;
  }
}

export default Engine