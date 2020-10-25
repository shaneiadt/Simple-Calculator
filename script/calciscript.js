	var digit='';
	var values='';
	var digits=[];
	var operator='';
	var answer;
	var ans=document.getElementById('ans');
	var query=document.getElementById('query');
	
	function button(event)
	{
		var button=event.srcElement;
		value=button.innerText;

		// Standardise × (&times;), ÷ (&divide;) and x
		if (value == '×' || value.toLowerCase() == 'x')
		{
			value = '*';
		} 
		else if (value == '÷')
		{
			value = '/';
		}
		
		switch(value)
		{
			// Empty the bar if C is pressed
			case 'C': emptybar(); break;
			case '(': insertBracket('('); break;
			case ')': insertBracket(')'); break;
			case '⌫': goBack(); break;

			// All other values enter the doMath function
			default: doMath(value); break;
		}
	}
	
	function doMath(value)
	{
		console.log('doMath()');
		console.log('BEFORE',{
			digit,
			digits,
			value,
			values,
			operator,
			answer,
			query: query.innerHTML,
			ans: ans.innerHTML,
		});
		if (value!='+' && value!='-' && value!='=' && value!='*' && value!='/' && value!='C')
		{
			//making the number such as 542 etc 
			if (digit!=answer)
			{
				digit=digit+value;
			}
			else
			{
				value='';
			}
		}
		if (value=='+' || value=='-' || value=='*' || value=='/')
		{
			// debugger;
			//pushing in array digits
			if (values=='' && (value=='+' || value=='-'))
			{
				digit=digit+value;
				// debugger;
			}
			else if (values=='' && (value=='/' || value=='*')) 
			{
				value='';
				// debugger;
			}
			else
			{
				// debugger;
				if (operator=='')
				{
					digits.push(digit);
					operator=value;
					digit='';
					// debugger;
				}
				//if operator is already there
				else
				{
					value='';
					// debugger;
				}
			}
		}
		if (value!='=' && value!='C')
		{
			if (value == '*') {
				value = '×';
			} else if (value == '/') {
				value = '÷';
			}
			values=values+value;
			query.innerHTML=values;
		}
		if (value=='=')
		{
			if (digit!='')
			{
				digits.push(digit);
			}
			
			var answe=digits[0]+operator+digits[1];
			var t=String(answe);
			var ru=eval(t);   //eval function evaluates the string expression given as argument to it
			answer=parseFloat(ru.toFixed(2)); //for approx to 2decimal places					  
			ans.innerHTML='='+answer;
			//converting digit into answer and empty the operator so that they can be reassigned
			digit=answer;
			console.log(answer);
			
			operator='';
			digits=[];
		}
		console.log('AFTER',{
			digit,
			digits,
			value,
			values,
			operator,
			answer,
			query: query.innerHTML,
			ans: ans.innerHTML,
		});
	}
	
	
	function emptybar()
	{
		digit='';
		values='';
		digits=[];
		operator='';
		query.innerHTML='';
		ans.innerHTML='';
	}

	function goBack()
	{
		if(typeof digit !== 'string') {
			value = '';
			emptybar();
			return;
		}

		digit = digit.substr(0, digit.length - 1);
		value = '';
		query.innerHTML = query.innerHTML.substr(0, query.innerHTML.length - 1);
		values = query.innerHTML;
	}

	function insertBracket(bracket)
	{

		console.log({
			digit,
			digits,
			value,
			values,
			operator,
			answer,
			query: query.innerHTML,
			ans: ans.innerHTML,
		});

		if(digit === '' && bracket === '(') {
			console.log('YES INSERT OPEN BRACKET');

			query.innerHTML += "(";
			values += "(";

			console.log('AFTER',{
				digit,
				digits,
				value,
				values,
				operator,
				answer,
				query: query.innerHTML,
				ans: ans.innerHTML,
			});
		}

		if(digit !== '' && bracket === ')') {
			console.log('YES INSERT CLOSE BRACKET');

			query.innerHTML += ")";
			values += ")";

			console.log('AFTER',{
				digit,
				digits,
				value,
				values,
				operator,
				answer,
				query: query.innerHTML,
				ans: ans.innerHTML,
			});
		}
		
		// if(digit === '' && bracket === ')') {
		// 	console.log('YES INSERT CLOSING BRACKET');
		// }
	}


$(document).keypress(function(e) {
		key = e.which;
		if (key >= 48 && key <= 57){ 
			value=key-48;
		}
		if(key>=42 && key<=47){
			value=String.fromCharCode(key);
			// Change x to *
			if (value.toLowerCase() == 'x')
			{
				value = '*';
			} 
		}
		if(key==13){
		//enter
		value='=';
		}

		doMath(value);
	});

$(document).keyup(function(e){
		if(e.which==27){
		//escape key
			emptybar();
		}
})
