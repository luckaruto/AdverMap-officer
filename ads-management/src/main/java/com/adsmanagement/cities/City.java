package com.adsmanagement.cities;


import com.adsmanagement.districts.District;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private List<District> districts;

    public City(Short id, String name) {
        this.id = id;
        this.name = name;
    }

    public City() {

    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
