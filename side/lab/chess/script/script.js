"use strict";

/**
* Объект с фигурами.
*/
const figures = {
    pawnWhite: {
        name: 'pawnWhite',
        code: '&#9817;',
    },
    castleWhite: {
        name: 'castleWhite',
        code: '&#9814;',
    },
   horseWhite: {
       name: 'horseWhite',
        code: '&#9816;',
    },
    bishopWhite: {
        name: 'bishopWhite',
        code: '&#9815;',
    },
    queenWhite: {
        name: 'queenWhite',
        code: '&#9813;',
    },
    kingWhite: {
        name: 'kingWhite',
        code: '&#9812;',
    },
    pawnBlack: {
        name: 'pawnBlack',
        code: '&#9823;',
    },
    castleBlack: {
        name: 'castleBlack',
        code: '&#9820;',
    },
   horseBlack: {
       name: 'horseBlack',
        code: '&#9822;',
    },
    bishopBlack: {
        name: 'bishopBlack',
        code: '&#9821;',
    },
    queenBlack: {
        name: 'queenBlack',
        code: '&#9819;',
    },
    kingBlack: {
        name: 'kingBlack',
        code: '&#9818;',
    },
};

/**
* Объект с методами проверки.
*/
const operator = {
    
    /**
    * Проверяем является ли ячейка черной и возвращает true или false.
    * @param {int} row - номер строки.
    * @param {int} col - номер колонки.
    * @returns {boolean} - возвращает true если ячейка черная, иначе false.
    */
    isBlack(row, col) {
        if ((row % 2 === 0 && col % 2 !==0) || (row % 2 !== 0 && col % 2 === 0)) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
    * Проверяем является ли ячека угловой и возвращает true или false.
    * @param {int} row - номер строки.
    * @param {int} rowLength - количество строк.
    * @param {int} col - номер колонки.
    * @param {int} colLength - количество колонок.
    * @returns {boolean} - возвращает true если ячейка угловая, иначе false.
    */
    isCorner(row, rowLength, col, colLength) {
        if ((row === 0 && col === 0) || (row === rowLength-1 && col === colLength-1) || (row === 0 && col === colLength-1) || (row === rowLength-1 && col === 0)) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
    * Проверяем является ли ячека именем колонки и возвращает true или false.
    * @param {int} row - номер строки.
    * @param {int} rowLength - количество строк.
    * @param {int} col - номер колонки.
    * @param {int} colLength - количество колонок.
    * @returns {boolean} - возвращает true если в ячейка должно содержаться имя колонки, иначе false.
    */
    isColName(row, rowLength, col, colLength) {
        if ((row === 0) && (col !== colLength) || (row === rowLength-1) && (col !== colLength)) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
    * Проверяем является ли ячека именем строки и возвращает true или false.
    * @param {int} row - номер строки.
    * @param {int} rowLength - количество строк.
    * @param {int} col - номер колонки.
    * @param {int} colLength - количество колонок.
    * @returns {boolean} - возвращает true если в ячейке должно содержаться имя строки, иначе false.
    */
    isRowlName(row, rowLength, col, colLength) {
        if ((col === 0) && (row !== rowLength) || (col === colLength-1) && (row !== rowLength)) {
            return true;
        } else {
            return false;
        }
    },
};

/**
    * Объект с настройками.
    * @property {HTMLElement} board - основа для генерации доски.
    * @property {int} rowCount - количество строк.
    * @property {int} colCount - количесво колонок.
    * @property {Array} colNames - массив с названиями колонок.
    * @property {Array} rowNames - массив с названиями строк.
    */
const settings = {
    board: document.getElementById('chessBoard'),
    rowCount: 10,
    colCount: 10,
    colNames: ['a','b','c','d','e','f','g','h'],
    rowNames: ['8','7','6','5','4','3','2','1'],
}

/**
 * Ядро программы, здесь будут все методы и свойства связанные с ней.
 * @property {figures} figures - набор фигур.
 * @property {operator} operator - набор проверок.
 * @property {settings} settings - набор настроек.
 */
const core = {
    figures,
    operator,
    settings,
    
    /**
    * Запускает программу
    */
    run() {
        
        this.init();
    },
    
    /**
    * Инициализируем начальные условия.
    */
    init() {
        //Рисуем доску.
        this.renderBoard(this.settings.rowCount, this.settings.colCount, this.settings.colNames, this.settings.rowNames);
        
        //Рисуем черные фигуры.
        this.renderFigure(this.figures.castleBlack.code, this.setPosition('a', '8'));
        this.renderFigure(this.figures.horseBlack.code, this.setPosition('b', '8'));
        this.renderFigure(this.figures.bishopBlack.code, this.setPosition('c', '8'));
        this.renderFigure(this.figures.queenBlack.code, this.setPosition('d', '8'));
        this.renderFigure(this.figures.kingBlack.code, this.setPosition('e', '8'));
        this.renderFigure(this.figures.bishopBlack.code, this.setPosition('f', '8'));
        this.renderFigure(this.figures.horseBlack.code, this.setPosition('g', '8'));
        this.renderFigure(this.figures.castleBlack.code, this.setPosition('h', '8'));
        for (let i = 0; i < this.settings.colCount-2; i++) {
            this.renderFigure(this.figures.pawnBlack.code, this.setPosition(this.settings.colNames[i], '7'));
        }
        
        //Рисуем белые фигуры.
        this.renderFigure(this.figures.castleWhite.code, this.setPosition('a', '1'));
        this.renderFigure(this.figures.horseWhite.code, this.setPosition('b', '1'));
        this.renderFigure(this.figures.bishopWhite.code, this.setPosition('c', '1'));
        this.renderFigure(this.figures.queenWhite.code, this.setPosition('d', '1'));
        this.renderFigure(this.figures.kingWhite.code, this.setPosition('e', '1'));
        this.renderFigure(this.figures.bishopWhite.code, this.setPosition('f', '1'));
        this.renderFigure(this.figures.horseWhite.code, this.setPosition('g', '1'));
        this.renderFigure(this.figures.castleWhite.code, this.setPosition('h', '1'));
        for (let i = 0; i < this.settings.colCount-2; i++) {
            this.renderFigure(this.figures.pawnWhite.code, this.setPosition(this.settings.colNames[i], '2'));
        }
    },
    
    /**
    * Отображает доску.
    * @param {int} rowCount - количество строк.
    * @param {int} colCount - количество колонок.
    * @param {Array} colNames - массив с именами колонок.
    * @param {Array} rowNames - массив с именами строк.
    */
    renderBoard(rowCount, colCount, colNames, rowNames) {
        //Пробегаемся по строкам.
        for (let row = 0; row < rowCount; row++) {
            
            //Создаем строку.
            const rowElem = document.createElement('tr');
            
            //Размещаем строку на странице.
            this.settings.board.append(rowElem);
            
            //Пробегаемся по колонкам.
            for (let col = 0; col < colCount; col++) {
                
                //Создаем ячейку.
                const cellElem = document.createElement('td');
                
                //Размещаем ячейку на странице.
                rowElem.append(cellElem);
                
                //Задаем ячейке класс.
                cellElem.classList.add('board');
                
                //Проверяем является ячейка угловой
                if (!this.operator.isCorner(row, rowCount, col, colCount)) {
                    
                    //Проверяем является ли ячейка названием столбца.
                    if (this.operator.isColName(row, rowCount, col, colCount)) {
                        
                        //Даем название.
                        cellElem.innerHTML = `${colNames[col-1]}`;
                        
                        //Проверяем является ли ячейка названием строки.
                    } else if (this.operator.isRowlName(row, rowCount, col, colCount)) {
                        
                        //Даем название.
                        cellElem.innerHTML = `${rowNames[row-1]}`;
                        
                        //Проверяем является ли ячейка черной.
                    } else if (this.operator.isBlack(row, col)) {
                        
                        //Красим в черный цвет.
                        cellElem.classList.add('black');
                        
                    } else {
                        //Красим в белый цвет.
                        cellElem.classList.add('white');
                    }
                }
                
            }
        }
    },
    
    /**
    * Отображает фигуру.
    * @param {string} figureCode - код фигуры.
    * @param {Array} position - массив с координатами фигуры.
    */
    renderFigure(figureCode, position) {
        this.settings.board.children[position[0]+1].children[position[1]+1].innerHTML = `${figureCode}`;
    },
    
    /*
    * Задаем позицию фигуры.
    * @param {string} colName - название колонки.
    * @param {string} rowName  - название строки.
    * @returns {Array} - возвращает координаты фигуры.
    */
    setPosition(colName, rowName) {
        return [
            this.settings.rowNames.indexOf(`${rowName}`),
            this.settings.colNames.indexOf(`${colName}`),
        ];
    },
    
    /**
    * Очищает позицию.
    * @param {Array} position - массив с координатами фигуры.
    */
    clearPosition (position) {
        this.settings.board.children[position[0]+1].children[position[1]+1].innerHTML = '';
    },
    
    /**
    * Передвигает фигуру на новое место и очищает старое.
    * @param {string} figureCode - код фигуры.
    * @param {Array} newPosition - массив с новой позицией.
    * @param {Array} oldPosition - массив со старой позицией.
    */
    moveFigure(figureCode, newPosition, oldPosition) {
        this.renderFigure(figureCode, newPosition);
        this.clearPosition(oldPosition);
    },
};

//Запускаем программу.
core.run();