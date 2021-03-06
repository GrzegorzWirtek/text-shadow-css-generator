export default class{
    constructor(){
        this.textArea = document.querySelector('.text-shadow__text-area-p');
        this.xArea = document.querySelector('.text-shaddow__element-area');
        this.xZip = document.querySelector('.text-shaddow-x');
        this.yZip = document.querySelector('.text-shaddow-y');
        this.blur = document.querySelector('.text-shaddow-blur');
        this.opacity = document.querySelector('.text-shaddow-opacity');
        this.input = document.querySelector('.box-shadow__copy-input');
        document.querySelector('.box-shadow__copy-p').addEventListener('click', ()=>this.copyCode());
        window.addEventListener('resize', ()=>this.onResize());
        this.areaActualWidth = getComputedStyle(this.xArea).width;
        this.factors ={
            xFactor: 0.73,
            yFactor: 0.216,
            blurFactor: 0.32,
            opacityFactor: 0.1151
        }
        this.widthZipButton = 40;
        this.viewCode();
        this.zipPosition();
        this.createShadow();
        let x = 0;
        this.xZipFn = (e)=> this.zipMove(e, x, this.xZip, 'xFactor');
        this.xZip.addEventListener('mousedown', (e)=>{window.addEventListener('mousemove', this.xZipFn), x = e.offsetX});
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.xZipFn));    
        this.xZipMobile = (e)=> this.zipMoveMobile(e, x, this.xZip, 'xFactor');
        this.xZip.addEventListener('touchstart', (e)=>{window.addEventListener('touchmove', this.xZipMobile), x = e.targetTouches[0].clientX-e.target.getBoundingClientRect().x});
        this.xZip.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.xZipMobile));

        this.yZipFn = (e)=> this.zipMove(e, x, this.yZip, 'yFactor'); 
        this.yZip.addEventListener('mousedown', (e)=>{window.addEventListener('mousemove', this.yZipFn), x = e.offsetX});
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.yZipFn));
        this.yZipMobile = (e)=> this.zipMoveMobile(e, x, this.yZip, 'yFactor');
        this.yZip.addEventListener('touchstart', (e)=>{window.addEventListener('touchmove', this.yZipMobile), x = e.targetTouches[0].clientX-e.target.getBoundingClientRect().x});
        this.yZip.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.yZipMobile));

        this.blurFn = (e)=> this.zipMove(e, x, this.blur, 'blurFactor');
        this.blur.addEventListener('mousedown', (e)=>{window.addEventListener('mousemove', this.blurFn), x = e.offsetX});
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.blurFn));
        this.blurMobile = (e)=> this.zipMoveMobile(e, x, this.blur, 'blurFactor');
        this.blur.addEventListener('touchstart', (e)=>{window.addEventListener('touchmove', this.blurMobile), x = e.targetTouches[0].clientX-e.target.getBoundingClientRect().x}); 
        this.blur.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.blurMobile)); 

        this.opacityFn = (e)=> this.zipMove(e, x, this.opacity, 'opacityFactor');
        this.opacity.addEventListener('mousedown', (e)=>{window.addEventListener('mousemove', this.opacityFn), x = e.offsetX});
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.opacityFn)); 
        this.opacityMobile = (e)=> this.zipMoveMobile(e,x, this.opacity, 'opacityFactor');
        this.opacity.addEventListener('touchstart', (e)=>{window.addEventListener('touchmove', this.opacityMobile), x = e.targetTouches[0].clientX-e.target.getBoundingClientRect().x}); 
        this.opacity.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.opacityMobile)); 
    }

    zipPosition(){  
        this.xZip.style.transform = `translateX(${(parseInt(this.areaActualWidth)-this.widthZipButton)*this.factors.xFactor}px)`; 
        this.yZip.style.transform = `translateX(${(parseInt(this.areaActualWidth)-this.widthZipButton)*this.factors.yFactor}px)`; 
        this.blur.style.transform = `translateX(${(parseInt(this.areaActualWidth)-this.widthZipButton)*this.factors.blurFactor}px)`; 
        this.opacity.style.transform = `translateX(${(parseInt(this.areaActualWidth)-this.widthZipButton)*this.factors.opacityFactor}px)`; 
    }

    zipMove(e, x, element, factor){
        let position = e.clientX-element.parentNode.offsetLeft;
        let areaWidth =parseInt(this.areaActualWidth)-(this.widthZipButton-x);
        if(position-x < 0) position = 0+x;
        if(position >areaWidth) position = areaWidth;
        this.factors[factor] = (position-x)/(areaWidth-x);
        element.style.transform = `translateX(${areaWidth*(position/areaWidth)-x}px)`;
        this.calculateShadowParameters(); 
    }

    zipMoveMobile(e, x, element, factor){
        let position = e.touches[0].clientX-element.parentNode.offsetLeft;
        let areaWidth =parseInt(this.areaActualWidth)-(this.widthZipButton-x);
        if(position-x < 0) position = 0+x;
        if(position >areaWidth) position = areaWidth;
        this.factors[factor] = (position-x)/(areaWidth-x);
        element.style.transform = `translateX(${areaWidth*(position/areaWidth)-x}px)`;
        this.calculateShadowParameters();
    }
 
    onResize(){
        this.areaActualWidth = getComputedStyle(this.xArea).width;   
        this.zipPosition();
    }

    calculateShadowParameters(){
        let x = ((this.factors.xFactor*this.widthZipButton-20)).toFixed(1);
        let y = (this.factors.yFactor*-this.widthZipButton+20).toFixed(1);
        let bl = ((this.factors.blurFactor*30)).toFixed(1);
        let op = (1-this.factors.opacityFactor*1).toFixed(2);
        this.createShadow(x, y, bl, op);        
    }
    createShadow(x=9.2,y=11.4,bl=9.6,op=0.88){
        this.textArea.style.textShadow =`${x}px ${y}px ${bl}px rgba(0, 0, 0, ${op})`;
        this.viewCode(`${x}px ${y}px ${bl}px rgba(0, 0, 0, ${op})`);
    }

    viewCode(code){
        this.input.value = 'text-shadow: '+code+';';
    }

    copyCode(){
        this.input.style.fontWeight = 'bold';
        setTimeout(()=>{
            this.input.style.fontWeight = 'normal';
        },100);
       this.input.select();
       document.execCommand('copy');
    }
}

