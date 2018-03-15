module.exports = function solveSudoku(matrix) {

  var matrixToBlock = [];
  // превращение матрицы в массив;
  for (let i=0; i<matrix.length; i++){
      
      for (let j=0; j<matrix.length;j++){
          matrixToBlock.push(matrix[i][j]);
      }

  }
      // console.log(matrixToBlock);

  // проверка уникальности числа в ячейке;
  function check_num (num, row, col) {
      
      for (let i = 0; i < 9; i++) {
          let check_index = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
          
          if (num == matrixToBlock[(row * 9) + i] ||
              num == matrixToBlock[col + (i * 9)] ||
              num == matrixToBlock[check_index]) {
              return false;
          }
      
      }
      return true;
  }

  // рекурсивная проверка всех возможных номеров для ячейки;
  function check_i_num (index) {
      
      if (index >= matrixToBlock.length) {
          return true;
      } else if (matrixToBlock[index] != 0) {
          return check_i_num (index + 1);
      }

      for (let i = 1; i <= 9; i++) {
          if (check_num (i, Math.floor(index / 9), index % 9)) {
              matrixToBlock[index] = i;
              if (check_i_num (index + 1)) {
                  return true;
              }
          }
      }

      matrixToBlock[index] = 0;
      return false;
  }

  // запуск проверки начиная с нуля
  check_i_num(0);
  
  // превращение массива обратно в матрицу
  function blockToMatrix(arr) {
      var result = [];
      
      for (let i = 0; i < arr.length; i += 9) {
          result.push(arr.slice(i, i + 9));
      }
      return result;
  }

  return blockToMatrix(matrixToBlock);

}