$(document).ready(function(){
    // 
    function startLoading(){
        $("#loading").removeClass("d-none")
    };
    function endLoading(){
        $("#loading").addClass("d-none");
    }
    let CURRENT_PAGE=1;
    // let PAGE_END=false;
    const API_KEY="k_rn5xiicq";
    const PER_PAGE=6;
    // 
    async function loadMoviePopularByIndexPage(indexPage){
        startLoading();
        const url=`https://imdb-api.com/en/API/MostPopularMovies/${API_KEY}`;
        let resJSON=await fetch(url);
        let listObj=await resJSON.json();
        const startIndex=(indexPage-1)*PER_PAGE;
        const endIndex=(indexPage*PER_PAGE)-1;
        const needList=listObj.items.slice(startIndex,endIndex+1); 
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
                                         <img class="img-fix" src="${needList[i].image}" alt="" srcset="">
                                    </div>
                                    <div class="col"> 
                                        <p class="card-text">Rate: ${needList[i].imDbRating}</p>
                                        <p class="card-text">Year: ${needList[i].year}</p>
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
            CURRENT_PAGE=indexPage;
        }      
    }
    loadMoviePopularByIndexPage(1);
    $("#pagination li").on("click",function(){
        let idPageStr=$(this).attr("id");
        if(idPageStr==="prev")
        {
            if(CURRENT_PAGE>1){
                CURRENT_PAGE--;
                loadMoviePopularByIndexPage(CURRENT_PAGE);
                return;
            }
            else 
                return;
        }
        else if(idPageStr==="next"){
            CURRENT_PAGE++;
            loadMoviePopularByIndexPage(CURRENT_PAGE);
        }
        else{
            const idNumber=idPageStr[idPageStr.length-1];
            const idPageNumber=Number(idNumber);
            loadMoviePopularByIndexPage(idPageNumber);
        }
    });
    // 
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




});