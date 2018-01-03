document.addEventListener('DOMContentLoaded', function (event) { // when DOM is fully loaded, then you can calculate 

    var operations = document.getElementsByClassName('operations'); // acces the buttons on the dom
    var numbers = document.getElementsByClassName('numbers');
    var dotBtn = document.getElementById('dot');
    var equals = document.getElementById('equals');
    var backspace = document.getElementById('backspace');
    var clearBtn = document.getElementById('clear');
    var memory = '0'; // this is where we store the first entered number
    var current = '0'; // this is the current input, it is a string,because it can later store operations and numbers
    var operation = 0; // with dis variable we will later determine what is the selected variable
    const MAXLEN = 14; // the max length of the entered mumber, i set it to 14, because of the design, we can set it to a bigger number, but then i need to change the font-size 
    var line1 = document.getElementById('display-p1'); // this is the display line1 on the display
    var line2 = document.getElementById('display-p2'); // this is the lower display line
    var operationLine2 = document.getElementById('operation'); // here we are displaying the operation 
    var displayLine1 = true; // just a variable to determine where are we current writing 
    var oSign = ''; // this is the operation sign, this is only visible to the user
    var display = document.getElementById('display'); // access the display
    var calculated = false; // to see if we have already calculated something
    var disableNumber = false; // this is true if the user didn't select an operation 
    var operationClicked = 0; // we need this to check how many times is the operation clicked




    for (var i = 0; i < numbers.length; i++) { // looping trough all number buttons to add event listeners

        numbers[i].addEventListener('click', function (event) { // listen for click on buttons

            console.log('You entered: ' + event.target.value);
            addDigitToDisplay(event.target.value); // pass value to addDigitToDisplay function for displaying 

        });

    }

    function addDigitToDisplay(input) { // function for adding numbers to display
        operationClicked = 0;



        if (calculated == true) { // check if aleardy is something calculated if yes, clear the screen and continue to calculate
            clear();

        }
        if (disableNumber == false) { // check if it is allowed to enter numbers, this is associated with the backspace function

            if (current.length > MAXLEN) { // check how long is the entered number  if longer than, definded, alert the user, and clear the screen
                alert('Too long number');
                clear();
            } else {

                if (current == 0 && (current.indexOf('.') == -1)) { // check if current is zero and check if there are decimal points (indexOf() method returns -1 if false)

                    current = input; // display first entered numer

                } else {

                    current += input; // if there is already something on display, just join the next numer

                }
            }
            if (displayLine1) { // if this is true, then we are displaying on the upper display line

                line1.innerHTML = current; // displaying on line1

            } else {
                line2.innerHTML = current; // displaying on line2
            }


        }



    }

    dotBtn.addEventListener('click', function (event) { // add event listener to the dot button
        console.log('.');
        dot(); // call the function
    });

    function dot() { // dot function checks what is the leading number if nothing on screen add leading zero, else just add the dot

        if (!disableNumber) {

            if (current.length == 0) {
                current = '0.';
            } else {
                if (current.indexOf('.') == -1) {
                    current += '.';
                }
            }

            if (displayLine1) { // same as line 58

                line1.innerHTML = current;

            } else {
                line2.innerHTML = current;
            }

        }

    }



    for (var j = 0; j < operations.length; j++) { // looping trough all buttons for functions +,-,*,/
        operations[j].addEventListener('click', function (event) { // add eventlisteners 



            console.log('operation: ' + event.target.value);
            operationf(event.target.value); // get the value of the button and pas it to the operationF function

        });
    }


    function operationf(operationSign) { //  operationF function for storing the operation 



        operationClicked++; // count how many times the user clicked the operation 





        if (calculated) { // this happens ONLY after pressing equals





            line1.innerHTML = memory;
            displayLine1 = false;
            document.getElementById('result').innerHTML = '';
            document.getElementById('hr').style.display = 'none';
            calculated = false;

        }




        if (operation != 0 && operationClicked == 1) { // this is for the calculating on the fly
            line1.innerHTML = memory;
            line2.innerHTML = current;







            if (operation == 1) {

                line1.innerHTML = eval(memory) * eval(current);



            } else if (operation == 2) {
                if (line2.innerHTML == 0) {
                    alert('Can\'t divide by zero!');
                    clear();
                } else {


                    line1.innerHTML = eval(memory) / eval(current);



                }

            } else if (operation == 3) {
                line1.innerHTML = eval(memory) + eval(current);
            } else if (operation == 4) {
                line1.innerHTML = eval(memory) - eval(current);
            }



        }


        disableNumber = false;

        if (current != '0' && calculated == false || current != '') { //  check what is on display first, it should make sense to choose a operation :D 
            if (operationSign.indexOf('*') > -1) {
                operation = 1; // for programming purpose we are setting the operation as a number, the oSign variable is holding the actual opeartion sign that will be visible to the end user     
            } else if (operationSign.indexOf('/') > -1) {
                operation = 2;

            } else if (operationSign.indexOf('+') > -1) {
                operation = 3;
            } else if (operationSign.indexOf('-') > -1) {
                operation = 4;
            }

            if (operation == 1) {
                oSign = 'x';
            } else if (operation == 2) {
                oSign = '&divide;';
            } else if (operation == 3) {

                oSign = '&plus;'
            } else {

                oSign = '&minus;';

            }

            displayLine1 = false; // when the user chooses an operation, we are swithing the line2 for displaying the input
            memory = line1.innerHTML; // we are holding the value of the first line in the memory variable, so we can it use latter
            current = ''; // clear current
            if (displayLine1) { // determine where are we on the screen now

                line1.innerHTML = current;

            } else {
                operationLine2.innerHTML = oSign; // add the operation to the display 
                line2.innerHTML = current; // line2 is now ready for entering numbers
            }

        }




    }

    equals.addEventListener('click', function (event) { // add event listener  to the equals button
        console.log('equals');
        calculate(); // call function to calculate
    });

    function calculate() {

        var dividingByZero = false; // we need this later to see if the user is trying to divide by zero

        if (operation != 0 && current != '') { // check if operation is set AND if the second number is set

            console.log('Selected operation...' + operation);


            if (operation == 1) { // execution of the calculations 
                current = eval(memory) * eval(current)
            } else if (operation == 2) {
                if (current == '0') { // if the user is trying ot divide by zero, set dividingByZero true, so we can alert the user 
                    dividingByZero = true;
                }
                current = eval(memory) / eval(current)
            } else if (operation == 3) {
                current = eval(memory) + eval(current)
            } else if (operation == 4) {
                current = eval(memory) - eval(current)
            }


            operation = 0; // clear everything
            memory = 0;


            if (!dividingByZero) { // if everything is okay, display the result 

                console.log('Result is ' + current);
                if (current.toString().length > MAXLEN) { // if the result is a bigger number, make the font size smaller 
                    document.getElementById('result').style.fontSize = '0.7em';
                } else {

                    document.getElementById('result').style.fontSize = '1em'; // keep the default font size
                }

                document.getElementById('hr').style.display = 'block'; // ad the hr element in the dom 
                document.getElementById('result').innerHTML = current; // display the result
                calculated = true;
                memory = current;

            } else { // if the user is trying to divide by zero 

                alert('Can\'t divide by zero!');
                clear();
                dividingByZero = false; // reset the variable
            }






        }

    }

    window.addEventListener("keyup", function (event) {

        // console.log(event.which);
        if (event.which == 8) {
            backspaceF();
        }

    });



    backspace.addEventListener('click', function (event) { // add event listener to the backspace button

        console.log('backspace');
        backspaceF(); // call the function 


    });


    function backspaceF() {


        if (line1.innerHTML !== '0') { // you can't delete the default 0 on the screen 

            if (calculated) { // if you have previously calculated something, just clear the screen 

                clear();

            } else if (displayLine1) {
                console.log('backspace function...');
                console.log(current);
                current = current.substring(0, current.length - 1); // backspacing 

                if (current == '') { // there should always be a nice 0 on the screen ;) 
                    current = '0';
                }

                line1.innerHTML = current; // display it

            } else if (!displayLine1) { // deleting the line2 



                current = line2.innerHTML;
                current = current.substring(0, current.length - 1);
                line2.innerHTML = current;

                if (line2.innerHTML == 0) {
                    console.log('line2 is empty, now delete the operation');
                    backspace.addEventListener('click', function (event) { // add one extra click to remove operation
                        operation = 0;
                        operationLine2.innerHTML = '';
                        disableNumber = true;


                    });

                    disableNumber = false;

                }









            }




        }
    }


    clearBtn.addEventListener('click', function (event) { // add event listener to the c button 


        console.log('clear');
        clear();


    });


    function clear() { // reset all data 
        current = '0';
        operation = '0';
        memory = '0';
        line1.innerHTML = current;
        line2.innerHTML = '';
        operationLine2.innerHTML = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('hr').style.display = 'none';
        displayLine1 = true;
        calculated = false;
        disableNumber = false;
        line1.style.fontSize = '1em';

    }



    var allBtns = document.getElementsByClassName('btn'); // for calculating on the fly, just check the length of the string in the line


    for (var z = 0; z <= allBtns.length; z++) {

        allBtns[z].addEventListener('click', function (event) {

            lineLen = line1.innerHTML;

            if (lineLen.toString().length > MAXLEN) {
                //console.log('make font size smaller');
                line1.style.fontSize = '0.7em';

            } else {
                //console.log('make font size default');
                line1.style.fontSize = '1em';
            }

        });

    }


});