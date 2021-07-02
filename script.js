var toggleStatus=false;
function toggle(){
    if(!toggleStatus)
{document.getElementById('category').style.display='block';
toggleStatus=true;}
else{
    document.getElementById('category').style.display='none';
toggleStatus=false;
}
}

    currentpageNo = 1; //helps in navigating to different pages.

    //function to fetch the data and display the necessary.
    async function disp() {
        let jobType=[];
        let levelType=[];

        var a=document.querySelectorAll('.cat');
        var b=document.querySelectorAll('.level');

        for(let x=0;x<a.length;x++){
            if(a[x].checked){
                jobType.push(a[x].value);
                console.log(jobType);
            }
        }
        let jobStr="";
        for(let x=0;x<(jobType.length)-1;x++){
            jobStr+=jobType[x]+'&';
        }
        jobStr+=jobType[jobType.length-1];


        for(let x=0;x<b.length;x++){
            if(b[x].checked){
                levelType.push(b[x].value);
                console.log(levelType);
            }
        }
        let levelStr="";
        for(let x=0;x<(levelType.length)-1;x++){
            levelStr+=levelType[x]+'&';
        }
        levelStr+=levelType[levelType.length-1];

        console.log(jobStr);
        console.log(levelStr);

        document.getElementById('here').innerHTML = `<br><hr><br><center><img src="./loading.gif"/></center><br><b>Loading Please wait......</b>`;
        const find = jobStr;
        const level=levelStr;
        
        
        console.log(`https://www.themuse.com/api/public/jobs?category=${find}&level=${level}&page=${currentpageNo}&descending=false`);
        try {
            const res = await fetch(`https://www.themuse.com/api/public/jobs?category=${find}&level=${level}&page=${currentpageNo}&descending=fasle`, { "method": "GET" });
            const final = await res.json();
            console.log(final);
            let i = 0;
            
            document.getElementById('here').innerHTML = 
            `<div class='card'>
            <h2>${final.results[i].company.name}</h2>
            <h4>Level: ${final.results[i].levels[0].name}</h4>
            <h5>Posted on: ${final.results[i].publication_date.substring(0, 10)}</h5>
            <hr>
            <br><div class='desc'><h2>Desciption</h2>` + 
            final.results[i].contents + "</div><hr>" + `<a class='apply-link' href=${final.results[i].refs.landing_page}><button class='apply-btn'>ApplyHere</button></a></div>`;
            for (i = 1; i < final.results.length; i++) {
                document.getElementById('here').innerHTML += 
            `<div class='card'>
            <h2>${final.results[i].company.name}</h2>
            <h4>Level: ${final.results[i].levels[0].name}</h4>
            <h5>Posted on: ${final.results[i].publication_date.substring(0, 10)}</h5>
            <hr>
            <br><div class='desc'><h2>Desciption</h2>` + 
            final.results[i].contents + "</div><hr>" + `<a class='apply-link' href=${final.results[i].refs.landing_page}><button class='apply-btn'>ApplyHere</button></a></div>`;
            }
            document.getElementById('here').innerHTML += "<br><br><hr><br><div id='prev-next-container'><button class='prev-next-btn' onclick='prev()'>prev</button><button class='prev-next-btn' onclick='next()'>next</button></div>";
            document.getElementById('#back-to-top').style.display='block';
        }
        catch (e) {
            console.log(e);
            document.getElementById('here').innerHTML = `<br><hr><br><b style="color:red;">Some Error occured</b>`;
        }

    }

    function next() {

        currentpageNo++;
        disp();
    }
    function prev() {
        if (currentpageNo === 1) {
            disp();
        }
        else {
            currentpageNo--;
            disp();
        }
    }
