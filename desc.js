export function makeDescription(desc, par) {
  if (desc.short) {
          //shortened description
          var short = document.createTextNode(desc.short);
          // as the name shows
          var dotdotdot = document.createElement('span');
          dotdotdot.innerHTML = '...';
          // remainder of the description
          var rem = document.createElement('span');
          rem.innerHTML = ' ' + desc.rem;
          rem.classList.add('read-more')
          // element to show/hide the remainder
          var readMore = document.createElement("span");
          readMore.innerHTML = 'Read more';
          readMore.classList.add('show-more')
          readMore.addEventListener('click', (e)=>{
            let dot = e.path[1].children[0];
            let show = e.path[1].children[1];
            if (e.path[0].innerHTML == 'Read more') {
              dot.style.display = 'none';
              show.style.display = 'inline';
              e.path[0].innerHTML = 'Read Less'
            } else {
              dot.style.display = 'inline';
              show.style.display = 'none';
              e.path[0].innerHTML = 'Read more'
            }
          })

          par.appendChild(short)
          par.appendChild(dotdotdot)
          par.appendChild(rem)
          par.appendChild(readMore)
        } else {
          // in case the description is very long
          par.appendChild(document.createTextNode(desc.allText))
        }
}


export function clipText(text) {
  let allText = (text)? text.split(' ') : '';
  let short = [];
  let rem = [];
  const LIMIT = 50;

  if (allText.length > LIMIT) {
    short = allText.slice(0, LIMIT);
    rem = allText.slice(LIMIT, allText.length);
  }

  allText = allText.join(' ');
  (short)? short = short.join(' ') : '';
  (rem)? rem = rem.join(' ') : '';

  return {allText, short, rem};
}