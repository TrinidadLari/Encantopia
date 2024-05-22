 document.addEventListener('DOMContentLoaded', () => {
      const toggleSearchSelectVisibility = () => {
        const searchSelectDiv = document.getElementById('searchSelect');
        if (window.innerWidth > 970) {
          searchSelectDiv.classList.remove('hidden');
          searchSelectDiv.classList.remove('searchSelect');
          searchSelectDiv.classList.add('serchSelectNav');
        } else {
          searchSelectDiv.classList.add('hidden');
          searchSelectDiv.classList.remove('serchSelectNav');
          searchSelectDiv.classList.add('searchSelect');
        }
      };

      toggleSearchSelectVisibility();
      window.addEventListener('resize', toggleSearchSelectVisibility);
    });