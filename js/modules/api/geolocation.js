export const getUserLocation = () => {
    const footerLocation = document.getElementById('user-location');
    if (footerLocation) {
        const footerText = footerLocation.querySelector('.location-text');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async ({coords}) => {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&accept-language=en`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village || "your area";
                    if (footerText) footerText.textContent = city;
                } catch(e) {
                    console.error(e);
                    if (footerText) footerText.textContent = "Unknown location";
                }
            }, () => {
                if (footerText) footerText.textContent = "Unable to detect location";
            });
        } else {
            if (footerText) footerText.textContent = "Geolocation not supported";
        }
    }

    const productDelivery = document.getElementById('product-delivery');
    if (productDelivery) {
        const cityElement = productDelivery.querySelector('.delivery-city');
        if (!navigator.geolocation) {
            productDelivery.style.display = 'none';
            return;
        }
        navigator.geolocation.getCurrentPosition(async ({coords}) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&accept-language=en`);
                const data = await response.json();
                const city = data.address.city || data.address.town || data.address.village || "your area";
                if (cityElement) cityElement.textContent = city;
            } catch (e) {
                console.error(e);
                productDelivery.style.display = 'none';
            }
        }, () => {
            productDelivery.style.display = 'none';
        });
    }
};