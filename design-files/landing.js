// ==========================================
// SCROLL REVEAL OBSERVER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const animElements = document.querySelectorAll(".animate-on-scroll");
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Stop observing once animation triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animElements.forEach(element => {
        scrollObserver.observe(element);
    });
});
