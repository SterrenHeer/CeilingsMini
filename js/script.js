$('.header_toggler').click(function() {
    $('.header_contacts').toggleClass('show flex');
});

function tabs(tabContainerSelector, tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabsParent = document.querySelector(`${tabContainerSelector} ${tabsParentSelector}`),
        tabs = document.querySelectorAll(`${tabContainerSelector} ${tabsSelector}`),
		tabsContent = document.querySelectorAll(`${tabContainerSelector} ${tabsContentSelector}`);

	function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
}

tabs('.promo_content_item.tab_1', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_2', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_3', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
tabs('.promo_content_item.tab_4', '.promo_tab_item', '.promo_tab_content', '.promo_tab_items', 'promo_tab_active');
