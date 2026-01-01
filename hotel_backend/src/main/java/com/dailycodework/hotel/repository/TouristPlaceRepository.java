package com.dailycodework.hotel.repository;

import com.dailycodework.hotel.model.TouristPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TouristPlaceRepository extends JpaRepository<TouristPlace, Long> {

    // Find all tourist places in a specific city
    List<TouristPlace> findByCity(String city);

    // Find tourist places by city and category
    List<TouristPlace> findByCityAndCategory(String city, String category);

    // Find all tourist places by category
    List<TouristPlace> findByCategory(String category);

    // Find tourist places within a certain distance from city center
    List<TouristPlace> findByCityAndDistanceFromCityLessThan(String city, double distance);
}
