const tag = document.getElementById('tag')
const main = document.getElementById('main');
const buttons = document.querySelectorAll('.lang')

let show=false;
fetch('./data.json')
.then((response)=>response.json())
.then((data)=>{
    for(let i =0 ; i< data.length; i++){ 

        let element ='';

        if(data[i].languages){
            for (let index = 0; index < data[i].languages.length; index++) {
                element += `<input type ="button" class="lang" value="${data[i].languages[index]}"/>`;
            }
        }
        let tool = '';

        if(data[i].tools){
            for (let ind = 0; ind < data[i].tools.length; ind++) {
                tool += `<input type ="button"  class="lang" value="${data[i].tools[ind]}"/>`;
            }
        }
        let newBtn ='';
        if(data[i].new){
            newBtn+= `<p class="new">NEW!</p>`
        }

        let featured = '';
        let bgDiv='';
        if (data[i].featured) {
            featured+= `<p class="featured">FEATURED</p>`
            bgDiv+=`<div class="bg-div"></div>`
        }
        
        main.innerHTML += `
        <div class="container">
        ${bgDiv}
        <div class="first-container">
          <div class="div-img">
            <img class="logo" src="${data[i].logo}" alt="photaosnap" />
          </div>

          <div class="desc">
            <div class="company">
              <strong class="company-name">${data[i].company}</strong>
              ${newBtn}
              ${featured}
            </div>

            <div class="employee">
              <h4 class="position">${data[i].position}</h4>
            </div>

            <div class="time">
              <p class="postedAt">${data[i].postedAt}</p>
              <span class="dot"></span>
              <p class="contract">${data[i].contract}</p>
              <span class="dot"></span>

              <p class="location">${data[i].location}</p>
            </div>
          </div>
        </div>

        <div class="second-container">
          <div class="languages">
            <input type ="button"  class="lang" value="${data[i].role}"/>
            <input type ="button"  class="lang" value="${data[i].level}"/>
            ${element}

            ${tool}
            
            </div>
        </div>
      </div>`
    }
})
.catch((err)=>{console.log(err)})

let done;
let div;
main.addEventListener('click',(e)=>{
    if(e.target.classList.contains('lang')){
        div = document.createElement('div');
        div.className= 'tagDiv';
        tag.append(div)
    }},{once:true})



main.addEventListener('click',(e)=>{
    if(e.target.classList.contains('lang')){
        const clearTag = document.createElement('a');
        const link = document.createTextNode('clear');
        link.className='link';
        clearTag.className='clear';
        clearTag.id='clear';
        clearTag.append(link);
        clearTag.title='clear'
        clearTag.href='#';

        div.append(clearTag);

        document.getElementById('clear').addEventListener('click',()=>{
            location.reload();
        })
    }},{once:true})

let count = 0;
let tagValBtn = [];

let arr =[];
main.addEventListener('click',(e)=>{
    if(e.target.classList.contains('lang')){
        main.innerHTML='';
        const containerTag = document.createElement('div')
        containerTag.className='containerTag';

        const tagBtn = document.createElement('input');
        count++;
        tagBtn.className = 'tagBtn';
        tagBtn.classList.add(`${count}`);
        tagBtn.value= e.target.value;
        tagBtn.type= 'button';
        let tagVal = tagBtn.value;
        tagValBtn.push(tagVal);
        
        
        const closeTag = document.createElement('img');
        closeTag.src='images/icon-remove.svg';
        closeTag.className='closeTag';
        closeTag.classList.add(`${count}`)
        
        containerTag.append(tagBtn);
        containerTag.append(closeTag);
        
        if (!arr.includes(tagVal)) {
            div.append(containerTag);
        }
        
        arr.push(tagVal);
        
        const closeBtn = document.querySelectorAll('.closeTag');

        closeBtn.forEach(ele=>{
            ele.addEventListener('click',()=>{
                if(ele.classList[1]==tagBtn.classList[1]){
                    containerTag.remove();
                    
                    tagValBtn.splice(tagValBtn.indexOf(tagBtn.value),1);
                    
                    main.innerHTML='';
                    
                    fetch('./data.json')
                    .then((response)=>response.json())
                    .then((data)=>{

                        for(let i =0 ; i< data.length; i++){ 
                            
                            let dataVal = [];
                            dataVal.push(data[i].role,data[i].level);
                            
                            if(data[i].languages){
                                dataVal.push(...data[i].languages)
                            };
                            
                            if(data[i].tools){
                                dataVal.push(...data[i].tools)
                            };
                            
                                if(tagValBtn.every(ele=>dataVal.includes(ele))){
                                    
                                    let element ='';

                                    if(data[i].languages){
                                        for (let index = 0; index < data[i].languages.length; index++) {
                                            element += `<input type ="button" class="lang" value="${data[i].languages[index]}"/>`;
                                        }
                                    }
                                    let tool = '';
                            
                                    if(data[i].tools){
                                        for (let ind = 0; ind < data[i].tools.length; ind++) {
                                            tool += `<input type ="button"  class="lang" value="${data[i].tools[ind]}"/>`;
                                        }
                                    }
                                    let newBtn ='';
                                    if(data[i].new){
                                        newBtn+= `<p class="new">NEW!</p>`
                                    }
                            
                                    let featured = '';
                                    let bgDiv='';
                                    if (data[i].featured) {
                                        featured+= `<p class="featured">FEATURED</p>`
                                        bgDiv+=`<div class="bg-div"></div>`
                                    }
                                    
                                    main.innerHTML += `
                                    <div class="container">
                                    ${bgDiv}
                                    <div class="first-container">
                                    <div class="div-img">
                                        <img class="logo" src="${data[i].logo}" alt="photaosnap" />
                                    </div>
                            
                                    <div class="desc">
                                        <div class="company">
                                        <strong class="company-name">${data[i].company}</strong>
                                        ${newBtn}
                                        ${featured}
                                        </div>
                            
                                        <div class="employee">
                                        <h4 class="position">${data[i].position}</h4>
                                        </div>
                            
                                        <div class="time">
                                        <p class="postedAt">${data[i].postedAt}</p>
                                        <span class="dot"></span>
                                        <p class="contract">${data[i].contract}</p>
                                        <span class="dot"></span>
                            
                                        <p class="location">${data[i].location}</p>
                                        </div>
                                    </div>
                                    </div>
                            
                                    <div class="second-container">
                                    <div class="languages">
                                        <input type ="button"  class="lang" value="${data[i].role}"/>
                                        <input type ="button"  class="lang" value="${data[i].level}"/>
                                        ${element}
                                        
                                        ${tool}
                                        
                                        </div>
                                    </div>
                                </div>`
                                    
                                    }else{
                                        main.innerHTML+='';
                                    }
                        }})
                    .catch((err)=>{console.log(err)})


                    //----------------////////////////////************ */
                    arr.pop()
                    let len = arr.length+1;
                    
                    len--;
                    if(len==0){
                        div.remove();
                        location.reload();
                    }
                }
                
            })
        })

        fetch('./data.json')
        .then((response)=>response.json())
        .then((data)=>{

            for(let i =0 ; i< data.length; i++){ 
                
                let dataVal = [];
                dataVal.push(data[i].role,data[i].level);

                if(data[i].languages){
                    dataVal.push(...data[i].languages)
                };

                if(data[i].tools){
                    dataVal.push(...data[i].tools)
                };
                
                
                    if(tagValBtn.every(ele=>dataVal.includes(ele))){
                        
                        let element ='';

                        if(data[i].languages){
                            for (let index = 0; index < data[i].languages.length; index++) {
                                element += `<input type ="button" class="lang" value="${data[i].languages[index]}"/>`;
                            }
                        }
                        let tool = '';
                
                        if(data[i].tools){
                            for (let ind = 0; ind < data[i].tools.length; ind++) {
                                tool += `<input type ="button"  class="lang" value="${data[i].tools[ind]}"/>`;
                            }
                        }
                        let newBtn ='';
                        if(data[i].new){
                            newBtn+= `<p class="new">NEW!</p>`
                        }
                
                        let featured = '';
                        let bgDiv='';
                        if (data[i].featured) {
                            featured+= `<p class="featured">FEATURED</p>`
                            bgDiv+=`<div class="bg-div"></div>`
                        }
                        
                        main.innerHTML += `
                        <div class="container">
                        ${bgDiv}
                        <div class="first-container">
                          <div class="div-img">
                            <img class="logo" src="${data[i].logo}" alt="photaosnap" />
                          </div>
                
                          <div class="desc">
                            <div class="company">
                              <strong class="company-name">${data[i].company}</strong>
                              ${newBtn}
                              ${featured}
                            </div>
                
                            <div class="employee">
                              <h4 class="position">${data[i].position}</h4>
                            </div>
                
                            <div class="time">
                              <p class="postedAt">${data[i].postedAt}</p>
                              <span class="dot"></span>
                              <p class="contract">${data[i].contract}</p>
                              <span class="dot"></span>
                
                              <p class="location">${data[i].location}</p>
                            </div>
                          </div>
                        </div>
                
                        <div class="second-container">
                          <div class="languages">
                            <input type ="button"  class="lang" value="${data[i].role}"/>
                            <input type ="button"  class="lang" value="${data[i].level}"/>
                            ${element}
                
                            ${tool}
                            
                            </div>
                        </div>
                      </div>`
                        
                        }else{
                            main.innerHTML+='';
                        }

                
                

               
            }})
        .catch((err)=>{console.log(err)})

        
        
        
    }
})











