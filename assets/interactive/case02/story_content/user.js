function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5tZceM0RuIg":
        Script1();
        break;
      case "5Y6isnX5xYs":
        Script2();
        break;
  }
}

function Script1() {  initialize(); }

function Script2() {  savingtolocal(); }



function savingtolocal(){
let p = GetPlayer();
var nq1=p.GetVar("q01");
var nq2= p.GetVar("q02");
var ncontrol =p.GetVar("control");
const nobj={ "q1":nq1,"q2":nq2,"control":ncontrol}
window.localStorage.setItem("CaseStudy", JSON.stringify(nobj));

}




function UpdateSlVariable()
{
var obj=JSON.parse(window.localStorage.getItem("CaseStudy"));
  let testq1='';
  let testq2='';
  let testcontrol='';
  let p = GetPlayer();
p.SetVar("q01",obj.q1);
 p.SetVar("q02",obj.q2);
 p.SetVar("control",obj.control);

testq1=p.GetVar("q01");
console.log("NEW VALUE FOR q01 IS:  "+testq1);
 testq2=p.GetVar("q02");
 console.log("NEW VALUE FOR obj.q2 IS:  "+obj.q2);
 console.log("NEW VALUE FOR q02 IS:  "+testq2);
 }

function initialize()
{
    //  initial storyline variables
  const data={ "q1":"",  "q2":"","control":"" }
  if(window.localStorage.getItem("CaseStudy")==null){
    window.localStorage.setItem("CaseStudy", JSON.stringify(data));
  }
  else{
     //get q01 q02 control from local storage
     UpdateSlVariable();
  }
}



