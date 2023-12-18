document.getElementById('_start')?.addEventListener('click',()=>{
    document.getElementById('audioStart')?.play();
    let userName:string|undefined=document.getElementById("_name")?.value;
    userName=userName===''?`user`:userName;
    document.getElementById('_startGame')?.style.opacity="0";
    document.getElementById('_startGame')?.style.zIndex="-111";


    document.getElementById('_nameU')?.innerHTML=userName;


})



// main varibels

let duration:number=1000;

let container=<HTMLDivElement>document.getElementById('container');

let blocks= Array.from(container?.children);

let orderRange:number[]=[...Array(blocks.length).keys()];

let curentBlockActive=0;

let tries=0;

// end of main varibels


// function for get shafle array:

// let getShaflrArray:number[]=(arr:number[])=>{
//     // all varaibals
//     let shafleArray:number[]=[];

//     let random:number;
//     // lop
//     for (let i = arr.length; i >= 0; i--) {
//         // random index
//         random=Math.round(Math.random()*i);
//         // set element of shafle array
//         shafleArray[shafleArray.length]=arr[random];
//         // remove element from the arr 
//         arr.splice(random,1);
//     }
//     // end of lop and return shafleArray
//     return shafleArray;
// }



// anather method for shafling:

let getShaflrArray=(arr:number[])=>{

    // let variabales
    let curent:number=arr.length-1,
    temp:number,
    random:number;

    while(curent>=0){
        // get random number
        random=Math.floor(Math.random()*curent);
        // save curent element
        temp=arr[curent];
        // set random element
        arr[curent]=arr[random];
        // set element from index curent
        arr[random]=temp;
        curent--;
    }


    return arr;
}



let shafleArray=getShaflrArray(orderRange);
blocks.forEach((block:any,index:number)=>{
    
    block.style.order=shafleArray[index];

    // add event ckick in any block
    block.addEventListener('click',()=>{flipBlock(block)   });

})
// document.body.classList

// make flip block function

let flipBlock=(block:Element)=>{

        block.classList.add('active')

        
    // filter all blocks arr fleped

    let flepedBlock:Element[]= blocks.filter(block=> block.classList.contains('active'));

    if(flepedBlock.length===2){
        
        stopFliping();
        // open the way to click
        setTimeout(()=>{
            checkMatchedBlocks(flepedBlock[0],flepedBlock[1])
            container.classList.remove('noClicking')},duration)
        
    }
}

// function stop fleping the blocks after towe blocks fliped

function stopFliping(){
    container.classList.add('noClicking');
}

// check if blocks are twin return true
function checkMatchedBlocks(firstBlock:Element,secondBlock:Element){

    if(firstBlock.getAttribute('data-img')===secondBlock.getAttribute('data-img')){
        firstBlock.classList.remove('active');
        secondBlock.classList.remove('active');

        firstBlock.classList.add('hasMatsh');
        secondBlock.classList.add('hasMatsh');
        document.getElementById('success')?.play();
        checkIfWin();
        return true;
    }else{
        firstBlock.classList.remove('active');
        secondBlock.classList.remove('active');
        tries++;
        document.getElementById('_wT')?.innerHTML=tries;
        document.getElementById('fail')?.play();
        return false;
    }
}
// check if user complited all blocks
function checkIfWin(){
    let successBlock:number=0;
    blocks.forEach((block)=>{
        if(block.classList.contains('hasMatsh')){
            successBlock++;
        }
    })
    if(+successBlock===+blocks.length){
        console.log('success');
        document.getElementById('win')?.play();
    }else{
        console.log('you not');
    }
}