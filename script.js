(() => {
const $=id=>document.getElementById(id), paper=$("letterPaper"), text=$("letterText"), name=$("authorName");
const picker=$("stickerPicker"), stickerPreview=$("stickerPreview"), modal=$("previewModal"), image=$("generatedImage"), link=$("downloadLink");
let selectedSticker="", imageBlob=null;
const fonts=["hand","nunito","caveat","kalam","indie","handlee","shadows"];
$("fontChoice").addEventListener("change",e=>{fonts.forEach(f=>paper.classList.toggle("font-"+f,f===e.target.value));});
function openPicker(){picker.hidden=false;}
$("stickerButton").addEventListener("click",openPicker);
stickerPreview.addEventListener("click",openPicker);
document.querySelectorAll("[data-sticker]").forEach(btn=>btn.addEventListener("click",()=>{
selectedSticker=btn.dataset.sticker;stickerPreview.textContent=selectedSticker;stickerPreview.hidden=false;
$("stickerButton").textContent="✎ Trocar adesivo";$("removeSticker").hidden=false;picker.hidden=true;
}));
$("removeSticker").addEventListener("click",()=>{selectedSticker="";stickerPreview.hidden=true;stickerPreview.textContent="";$("stickerButton").textContent="＋ Adicionar adesivo";$("removeSticker").hidden=true;picker.hidden=true;});
function updateSignature(){$("signaturePreview").textContent=name.value.trim()||"Alguém do Cantinho";}
name.addEventListener("input",updateSignature);
function wrap(ctx,value,maxWidth){const result=[];value.split("\\n").forEach(p=>{if(!p){result.push("");return;}let line="";p.split(/\\s+/).forEach(word=>{let test=line?line+" "+word:word;if(line&&ctx.measureText(test).width>maxWidth){result.push(line);line=word;}else line=test;});result.push(line);});return result;}
async function generate(){
const btn=$("makeImage");btn.disabled=true;btn.textContent="Preparando sua carta…";
try{
if(document.fonts?.ready) await document.fonts.ready;
const width=900,left=100,right=70,lineHeight=43,canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
const fontMap={hand:'31px "Patrick Hand"',nunito:'27px "Nunito"',caveat:'42px "Caveat"',kalam:'30px "Kalam"',indie:'33px "Indie Flower"',handlee:'31px "Handlee"',shadows:'31px "Shadows Into Light"'};
const choice=$("fontChoice").value;ctx.font=fontMap[choice]||fontMap.hand;
const lines=wrap(ctx,text.value.trim()||" ",width-left-right);const height=Math.min(2600,Math.max(680,lines.length*lineHeight+300));canvas.width=width;canvas.height=height;
ctx.fillStyle="#fffdf7";ctx.fillRect(0,0,width,height);ctx.strokeStyle="#c7d9e9";ctx.lineWidth=1.5;
for(let y=150;y<height-45;y+=lineHeight){ctx.beginPath();ctx.moveTo(42,y);ctx.lineTo(width-42,y);ctx.stroke();}
ctx.strokeStyle="#e7a7ad";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(76,0);ctx.lineTo(76,height);ctx.stroke();
ctx.fillStyle="#9b8c7c";ctx.font='20px "Nunito"';ctx.fillText("CANTINHO DO APOIO · UMA CARTA FEITA COM CARINHO",left,62);
ctx.fillStyle="#b66f77";ctx.font='34px "Nunito"';ctx.fillText("♡",width-90,66);
if(selectedSticker){ctx.font='58px "Nunito"';ctx.fillText(selectedSticker,width-130,130);}
ctx.fillStyle="#3e3934";ctx.font=fontMap[choice]||fontMap.hand;let y=150;
lines.forEach(line=>{if(y<height-150)ctx.fillText(line,left,y-7);y+=lineHeight;});
const signY=Math.min(height-90,y+25);ctx.fillStyle="#5d5148";ctx.font=choice==="caveat"?'36px "Caveat"':'27px "Patrick Hand"';ctx.fillText("Com carinho,",left,signY);
ctx.font=choice==="caveat"?'bold 42px "Caveat"':'bold 30px "Patrick Hand"';ctx.fillText((name.value.trim()||"Alguém do Cantinho").slice(0,45),left,signY+42);
ctx.fillStyle="#a18f7f";ctx.font='18px "Nunito"';ctx.textAlign="right";ctx.fillText("Cada palavra importa ♡",width-48,height-28);
imageBlob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png"));if(!imageBlob)throw Error("Falha ao criar imagem");
const url=URL.createObjectURL(imageBlob);image.src=url;link.href=url;modal.classList.add("open");modal.setAttribute("aria-hidden","false");$("status").textContent="Imagem pronta. Salve ou compartilhe sua carta.";
}catch(e){$("status").textContent="Não foi possível gerar a imagem agora. Tente novamente ou use a captura de tela do celular.";}
finally{btn.disabled=false;btn.textContent="♡ Gerar imagem da carta";}
}
$("makeImage").addEventListener("click",generate);
function close(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
$("closePreview").addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close();});
$("nativeShare").addEventListener("click",async()=>{if(!imageBlob)return;const file=new File([imageBlob],"carta-cantinho-do-apoio.png",{type:"image/png"});try{if(navigator.canShare?.({files:[file]}))await navigator.share({files:[file],title:"Carta do Cantinho do Apoio",text:"Uma mensagem feita com carinho."});else $("status").textContent="Compartilhamento direto indisponível. Salve a imagem e envie pelo aplicativo de mensagens.";}catch(e){if(e.name!=="AbortError")$("status").textContent="Você pode salvar a imagem e enviá-la pelo aplicativo que preferir.";}});
$("resetLetter").addEventListener("click",()=>{if(text.value.trim()&&!confirm("Quer apagar esta carta e começar outra?"))return;text.value="";name.value="";updateSignature();$("fontChoice").value="hand";fonts.forEach(f=>paper.classList.toggle("font-"+f,f==="hand"));selectedSticker="";stickerPreview.hidden=true;stickerPreview.textContent="";$("stickerButton").textContent="＋ Adicionar adesivo";$("removeSticker").hidden=true;picker.hidden=true;close();$("status").textContent="Sua carta fica neste aparelho enquanto você escreve.";});
updateSignature();paper.classList.add("font-hand");
})();