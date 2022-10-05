function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6TQxH5tpduq":
        Script1();
        break;
      case "5gbhXrjoTW4":
        Script2();
        break;
      case "6kr9vQh5TuV":
        Script3();
        break;
      case "62rGIlnVUJ4":
        Script4();
        break;
      case "5qs4ApNWleR":
        Script5();
        break;
      case "6h97B8spXp9":
        Script6();
        break;
      case "6TFEg4sYlUc":
        Script7();
        break;
      case "6V7Q6D6CniR":
        Script8();
        break;
      case "6aaBKgdtHtG":
        Script9();
        break;
      case "6AER4wumGdy":
        Script10();
        break;
  }
}

function Script1()
{
  // get p_1-p_5 from json
//calculate sum
initialize();
savingtolocal(1);


let player=GetPlayer();
let sum=player.GetVar("p_1")+player.GetVar("p_2")+player.GetVar("p_3")+player.GetVar("p_4")+player.GetVar("p_5");
 player.SetVar("progress",sum);

}

function Script2()
{
  //set p_1 to value 20 in json if item not found
// alert ('p1');
savingtolocal(1);

}

function Script3()
{
  // get p_1-p_5 from json
//calculate sum

initialize();
savingtolocal(1);


let player=GetPlayer();
let sum=player.GetVar("p_1")+player.GetVar("p_2")+player.GetVar("p_3")+player.GetVar("p_4")+player.GetVar("p_5");
 player.SetVar("progress",sum);
}

function Script4()
{
  //set p_5 to value 20 in json if item not found
  savingtolocal(5);


}

function Script5()
{
  // get p_1-p_5 from json
//calculate sum

initialize();
savingtolocal(1);


let player=GetPlayer();
let sum=player.GetVar("p_1")+player.GetVar("p_2")+player.GetVar("p_3")+player.GetVar("p_4")+player.GetVar("p_5");
 player.SetVar("progress",sum);
}

function Script6()
{
  //set p_2 to value 20 in json if item not found
  savingtolocal(2);


}

function Script7()
{
  // get p_1-p_5 from json
//calculate sum

initialize();
savingtolocal(1);


let player=GetPlayer();
let sum=player.GetVar("p_1")+player.GetVar("p_2")+player.GetVar("p_3")+player.GetVar("p_4")+player.GetVar("p_5");
 player.SetVar("progress",sum);
}

function Script8()
{
  //set p_4 to value 20 in json if item not found
  savingtolocal(4);


}

function Script9()
{
  // get p_1-p_5 from json
//calculate sum

initialize();
savingtolocal(1);


let player=GetPlayer();
let sum=player.GetVar("p_1")+player.GetVar("p_2")+player.GetVar("p_3")+player.GetVar("p_4")+player.GetVar("p_5");
 player.SetVar("progress",sum);

}

function Script10()
{
  //set p_3 to value 20 in json if item not found
  savingtolocal(3);


}

function initialize()
{
    //  initial storyline variables
  const data={ "p1":"0",  "p2":"0","p3":"0","p4":"0" ,"p5":"0"}
  if(window.localStorage.getItem("progress")==null){
    window.localStorage.setItem("progress", JSON.stringify(data));
  }
  else{
     //get q01 q02 control from local storage
     UpdateSlVariable();
  }
}

function UpdateSlVariable()
{
var obj=JSON.parse(window.localStorage.getItem("progress"));
  
    
  let p = GetPlayer();
p.SetVar("p_1",obj.p1);
 p.SetVar("p_2",obj.p2);
 p.SetVar("p_3",obj.p3);
 p.SetVar("p_4",obj.p4);
 p.SetVar("p_5",obj.p5);


// testq1=p.GetVar("q01");
// console.log("NEW VALUE FOR q01 IS:  "+testq1);
//  testq2=p.GetVar("q02");
//  console.log("NEW VALUE FOR obj.q2 IS:  "+obj.q2);
//  console.log("NEW VALUE FOR q02 IS:  "+testq2);
 }

 function savingtolocal(i){
  // const nobj={ "p1":np1,"p2":np2,"p3":np3,"p4":np4,"p5":np5}

  var obj=JSON.parse(window.localStorage.getItem("progress"));
      
  let p = GetPlayer();




  switch (i) 
    {
    case 1:
      // alert('1111');
      obj.p1=p.GetVar("p_1");
      break;
    case 2:
      // alert('222');

      obj.p2=p.GetVar("p_2");
      break;
    case 3:
      // alert('333');

      obj.p3=p.GetVar("p_3");
      break;
    case 4:
      // alert('444');

      obj.p4=p.GetVar("p_4");
      break;
    case 5:
      // alert('555');
      obj.p5=p.GetVar("p_5");

      break;
      }

    // const nobj={ "p1":20,"p2":20,"p3":20,"p4":20, "p5":20}

  window.localStorage.setItem("progress", JSON.stringify(obj));
  
  }