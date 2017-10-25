const messages = [
    'message 01',
    'message 02',
    'message 03',
    'message 04',
    'message 05',
];

let number = prompt("This page says:\n \n 1:Show messages\n 2:Add a message\n 3:Delete a message\n 0:Quit", "");

if(number==0)
{
	document.getElementById("display").innerHTML = "Good Bye";
}else if(number==1)
{
let str = "The current messages are:";
	for(let i=0;i< messages.length;i++)
	{
		str = str+"<br>"+(i+1)+": ";
		str =  str+messages[i];
	}
	document.getElementById("display").innerHTML = str;
}else if(number==2)
{
	let new_msg = prompt("Enter a new message","");
	<!-- add new element -->
	messages.push(new_msg);   
	
	let str = "The current messages are:";
	for(let i=0;i< messages.length;i++)
	{
		str = str+"<br>"+(i+1)+": ";
		str =  str+messages[i];
	}
	document.getElementById("display").innerHTML = str;
}else if(number==3)
{
	let index = prompt("Enter the message index (between 1 and "+messages.length+")","");
<!-- remove element (index,amount)-->
	index = index-1;
	if(index >= 0 && index < messages.length)
	{
		messages.splice(index, 1);
	
		let str = "The current message are:";
		for(let i=0;i< messages.length;i++)
		{
			str = str+"<br>"+(i+1)+": ";
			str =  str+messages[i];
		}
		document.getElementById("display").innerHTML = str;
	}
	else
	{
		document.getElementById("display").innerHTML = "Please refresh and select a correct command";
	}
}else
{
	document.getElementById("display").innerHTML = "Please refresh and select a correct command";
}

