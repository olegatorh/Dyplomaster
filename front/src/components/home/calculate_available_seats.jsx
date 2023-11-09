
export const calculate_available_seats_now = (bookings, places) => {
        const updatedPlaces = [...places];
        for (const booking of bookings) {
            const match = updatedPlaces.find((place) => place.place_name === booking.place_name);
            if (match) {
                match.seats -= booking.people_number;
            }
        }
        return updatedPlaces;
    }
;
