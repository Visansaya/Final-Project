let number;
let txt;
number = prompt("Please enter a number between 2 and 10: ");
if(number >=2 && number <= 10)
{
	txt = "Your input number is "+number;
	document.getElementById("show1_1").innerHTML = txt;
	let temp = number;
	let count=0;
	while(temp >= 0.000001)
	{
		temp = temp/2;
		count = count+1;
	}
	document.getElementById("show2").innerHTML = "The number of times to divide the number "+number+" by 2 to get a value less than one millionth is "+ count;
	let txt_star="";
	
	for(let i=number;i>0;i--)
	{
		for(let j=i;j>0;j--)
		{
			txt_star = txt_star + "*"; 
		}
		txt_star = txt_star + "<br>";
	}
	document.getElementById("show3").innerHTML=txt_star;
}
else {
	txt = "Your input is "+number+". The valid input number is between 2 and 10. Please reload this page and try again.";
	document.getElementById("show3").style.display = "none";
	document.getElementById("show1_2").innerHTML = txt;
	
}

