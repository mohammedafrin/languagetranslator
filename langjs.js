const selecttag=document.querySelectorAll('select'); 
const fromtext=document.querySelector('.fromtext');
const totext=document.querySelector('.totext');
const translatebtn=document.querySelector('.btn');
const exchange=document.querySelector('.exchange');
const icons=document.querySelectorAll('.row i');
selecttag.forEach((tag,id) => {
    for (const country_code in countries) {
        let selected;
        if(id==0 && country_code=='en-GB')
        selected="selected";
    else if(id==1 && country_code=='hi-IN')
    selected="selected";
        console.log(countries[country_code]);
    let option=` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
     tag.insertAdjacentHTML("beforeend",option);
    }
});
exchange.addEventListener('click',()=>{
    let temp=fromtext.value;
    fromtext.value=totext.value;
    totext.value=temp;
    let temp2=selecttag[0].value;
    selecttag[0].value=selecttag[1].value;
    selecttag[1].value=temp2;
});
translatebtn.addEventListener('click',()=>{
    let text=fromtext.value;
    let translatefrom=selecttag[0].value;
    let translateto=selecttag[1].value;
const url=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
fetch(url).then(res=>res.json()).then(data=>{
    totext.value=data.responseData.translatedText;
});
});
icons.forEach(icon=>{
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id=="from")
            navigator.clipboard.writeText(fromtext.value);
        else if(target.id=="to")
        navigator.clipboard.writeText(totext.value);
        }
    else{
        let utterance;
    if(target.id=="from")
    utterance=new SpeechSynthesisUtterance(fromtext.value);
else{
utterance=new SpeechSynthesisUtterance(totext.value);
utterance.lang=selecttag[1].value;
}
speechSynthesis.speak(utterance);
    }
    })
})