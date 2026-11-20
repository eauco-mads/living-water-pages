// Bottled water cost calculator (ported from stopdrinkingacid.com/whats-in-my-water)
(function(){
  // Approximate retail price per 16.9 oz bottle (single-serve). Visitors can edit it.
  var brandPrices={
    generic:0.50,aquafina:0.89,dasani:0.89,nestle:0.79,
    polandspring:1.09,deerpark:0.99,crystalgeyser:0.89,
    fiji:1.59,evian:1.89,icelandic:1.49,mountainvalley:1.79,waiakea:1.39,
    smartwater:1.29,lifewtr:1.49,liquideath:1.49,voss:1.99,
    essentia:1.39,core:1.29,evamor:1.29
  };
  var $=function(id){return document.getElementById(id)};
  var money=function(n){return '$'+Math.round(n).toLocaleString()};

  function calc(){
    var price=parseFloat($('cPrice').value)||0;
    var bpd=+$('cBPD').value, ppl=+$('cPPL').value;
    $('bpdOut').textContent=bpd; $('pplOut').textContent=ppl;
    var big=$('rYear');
    if(!price){
      big.textContent='Pick your brand'; big.classList.add('empty');
      ['rMonth','r5','r10','rBottles'].forEach(function(id){$(id).textContent='—'});
      $('rPayback').textContent=''; return;
    }
    var perDay=price*bpd*ppl, year=perDay*365;
    big.textContent=money(year); big.classList.remove('empty');
    $('rMonth').textContent=money(year/12);
    $('r5').textContent=money(year*5);
    $('r10').textContent=money(year*10);
    $('rBottles').textContent=Math.round(bpd*ppl*365).toLocaleString();
    var machine=parseFloat($('cMachine').value)||0;
    if(machine>0){
      var yrs=machine/year;
      $('rPayback').innerHTML=yrs<=1
        ? 'At your current spend, that one-time setup <b>pays for itself in under a year</b>.'
        : 'At your current spend, that one-time setup <b>pays for itself in about '+(Math.round(yrs*10)/10)+' years</b>, then it keeps going.';
    } else { $('rPayback').textContent=''; }
  }
  window.addEventListener('DOMContentLoaded',function(){
    $('cBrand').addEventListener('change',function(){
      var p=brandPrices[this.value]; $('cPrice').value=p?p.toFixed(2):''; calc();
    });
    ['cPrice','cBPD','cPPL','cMachine'].forEach(function(id){$(id).addEventListener('input',calc)});
    calc();
  });
})();
