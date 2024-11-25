 document.addEventListener('DOMContentLoaded', () => {
      const toggleSearchSelectVisibility = () => {
        const searchSelectDiv = document.getElementById('searchSelect');
        const burgerBtn = document.getElementById('burgerBtn');
        const burguerMenu = document.getElementById('burguerMenu');
        if (window.innerWidth > 970) {
          searchSelectDiv.classList.remove('searchSelect');
          searchSelectDiv.classList.add('serchSelectNav');
           burgerBtn.classList.add('hidden');
          burguerMenu.classList.remove('hidden');
          burguerMenu.classList.remove('burguerMenu');
          burguerMenu.classList.add('menu');
          
        } else {
          searchSelectDiv.classList.add('hidden');
          searchSelectDiv.classList.remove('serchSelectNav');
          searchSelectDiv.classList.add('searchSelect');
          burgerBtn.classList.remove('hidden');
          burguerMenu.classList.add('hidden');
           burguerMenu.classList.add('burguerMenu');
          burguerMenu.classList.remove('menu');
         
        }
      };

      toggleSearchSelectVisibility();
      window.addEventListener('resize', toggleSearchSelectVisibility);
    });