$(document).ready(function(){
    const searchString=window.location.search;
    const index=searchString.indexOf("/");
    const API_KEY=searchString.slice(1,11);
    const idActor=searchString.slice(12);

    function startLoading(){
        $("#loading").removeClass("d-none")
    };
    function endLoading(){
        $("#loading").addClass("d-none");
    }
    async function getActor(){
        startLoading();
        const url=`https://imdb-api.com/en/API/Name/${API_KEY}/${idActor}`;
        let resJsonActor=await fetch(url);
        let ObjInfo=await resJsonActor.json();
        console.log(ObjInfo);
        $("#content").empty();
        $("#content").append(`
            <div class="row mb-3">
                <div class="col">
                    <div class="card bg-fix">
                        <div class="row ">
                        <div class="col-sm-4">
                            <img class="w-100 h-100" src="${ObjInfo.image}" alt="picture" srcset="">
                        </div>
                        <div class="col-sm-8">
                            <div class="card-body">
                            <h5 class="card-title">${ObjInfo.name}</h5>
                            <p class="card-text text-justify">Summary:<br> ${ObjInfo.summary}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        endLoading();

    }
    getActor();
    $("#search").on("click", async function(){
        startLoading();
        let value=$("input").val().toLowerCase();
        value.trim();
        let url=`https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${value}`;
        let resJSON=await fetch(url);
        let listsObj=await resJSON.json();
        let listResult=listsObj.results;
        const needList=listResult.slice(0,6);
        console.log(needList)
        endLoading();
        $("#content").empty(); 
        // 
        $("#content").append(`
                    <div id="row_1" class="row mb-2">
                    </div> <!-- end row -->
                    `)
        // 
        let countRow=1;
        for(let i=0;i<needList.length;i++)
        {   
            $(`#row_${countRow}`).append(`
                <div class="col">
                    <div  class="card h-100 bg-fix">
                        <div class="card-body card_fix">
                            <div class="row">
                                    <div class="col">   
                                         <img class="img-fix" src="${needList[i].image}" alt="picture" >
                                    </div>
                                    <div class="col"> 
                                        <a href="./detail.html?${API_KEY}/${needList[i].id}" class="btn btn-primary w-100">${needList[i].title}</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            if(((i+1)%3)==0){
                countRow++;
                $("#content").append(`
                    <div id="row_${countRow}" class="row mb-2">
                    </div> <!-- end row -->
                `);
            }
        }
        if(needList.length>0){
            $("#pagination").removeClass("d-none");
        }      


    });
})