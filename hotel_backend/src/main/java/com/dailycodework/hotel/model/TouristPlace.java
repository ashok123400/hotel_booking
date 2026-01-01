package com.dailycodework.hotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tourist_places")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TouristPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String description;
    private String category; // Museum, Temple, Beach, Historical, Park, etc.
    private double latitude;
    private double longitude;
    private double distanceFromCity; // in km
    private String imageUrl;
    private String openingHours;
    private boolean ticketRequired;
    private double ticketPrice;

    public TouristPlace(String name, String city, String description, String category) {
        this.name = name;
        this.city = city;
        this.description = description;
        this.category = category;
    }
}
