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
            xFactor: 0.6,
            yFactor: 0.6,
            blurFactor: 0.068,
            opacityFactor: 0.5
        }
        this.viewCode();
        this.zipPosition();
        this.createShadow();

        this.xZipFn = (e)=> this.zipMove(e, this.xZip, 'xFactor');
        this.xZip.addEventListener('mousedown', ()=>window.addEventListener('mousemove', this.xZipFn));
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.xZipFn));    
        this.xZipMobile = (e)=> this.zipMoveMobile(e, this.xZip, 'xFactor');
        this.xZip.addEventListener('touchstart', ()=>window.addEventListener('touchmove', this.xZipMobile));
        this.xZip.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.xZipMobile));

        this.yZipFn = (e)=> this.zipMove(e, this.yZip, 'yFactor'); 
        this.yZip.addEventListener('mousedown', ()=>window.addEventListener('mousemove', this.yZipFn));
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.yZipFn));
        this.yZipMobile = (e)=> this.zipMoveMobile(e, this.yZip, 'yFactor');
        this.yZip.addEventListener('touchstart', ()=>window.addEventListener('touchmove', this.yZipMobile));
        this.yZip.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.yZipMobile));

        this.blurFn = (e)=> this.zipMove(e, this.blur, 'blurFactor');
        this.blur.addEventListener('mousedown', ()=>window.addEventListener('mousemove', this.blurFn));
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.blurFn));
        this.blurMobile = (e)=> this.zipMoveMobile(e, this.blur, 'blurFactor');
        this.blur.addEventListener('touchstart', ()=>window.addEventListener('touchmove', this.blurMobile)); 
        this.blur.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.blurMobile)); 

        this.opacityFn = (e)=> this.zipMove(e, this.opacity, 'opacityFactor');
        this.opacity.addEventListener('mousedown', ()=>window.addEventListener('mousemove', this.opacityFn));
        window.addEventListener('mouseup',()=>window.removeEventListener('mousemove', this.opacityFn)); 
        this.opacityMobile = (e)=> this.zipMoveMobile(e, this.opacity, 'opacityFactor');
        this.opacity.addEventListener('touchstart', ()=>window.addEventListener('touchmove', this.opacityMobile)); 
        this.opacity.addEventListener('touchend', ()=>window.removeEventListener('touchmove', this.opacityMobile)); 
    }

    zipPosition(){  
        this.xZip.style.transform = `translateX(${parseInt(this.areaActualWidth)*this.factors.xFactor}px)`; 
        this.yZip.style.transform = `translateX(${parseInt(this.areaActualWidth)*this.factors.yFactor}px)`; 
        this.blur.style.transform = `translateX(${parseInt(this.areaActualWidth)*this.factors.blurFactor}px)`; 
        this.opacity.style.transform = `translateX(${parseInt(this.areaActualWidth)*this.factors.opacityFactor}px)`; 
    }

    zipMove(e, element, factor){
        let position = e.clientX-element.parentNode.offsetLeft;
        let areaWidth =parseInt(this.areaActualWidth)- 40;
        if(position < 0) position = 0;
        if(position >areaWidth) position = areaWidth;
        this.factors[factor] = position/areaWidth;
        element.style.transform = `translateX(${areaWidth*(position/areaWidth)}px)`;
        this.calculateShadowParameters();   
    }

    zipMoveMobile(e, element, factor){
        let position = e.touches[0].clientX-element.parentNode.offsetLeft;
        let areaWidth =parseInt(this.areaActualWidth)- 12;
        if(position < 0) position = 0;
        if(position >areaWidth) position = areaWidth;
        this.factors[factor] = position/areaWidth;
        element.style.transform = `translateX(${areaWidth*(position/areaWidth)}px)`;
        this.calculateShadowParameters();   
    }
 
    onResize(){
        this.areaActualWidth = getComputedStyle(this.xArea).width;   
        this.zipPosition();
    }

    calculateShadowParameters(){
        let x = (this.factors.xFactor*40-20).toFixed(1);
        let y = (this.factors.yFactor*-40+20).toFixed(1);
        let bl = (this.factors.blurFactor*30).toFixed(1);
        let op = (1-this.factors.opacityFactor*1).toFixed(2);
        this.createShadow(x,y, bl,op);    
    }
    createShadow(x=4,y=-4,bl=2,op=0.50){
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
