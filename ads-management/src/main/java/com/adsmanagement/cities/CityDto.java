package com.adsmanagement.cities;


public class CityDto {

    private Short id;

    private String name;

    public CityDto(Short id, String name) {
        this.id = id;
        this.name = name;
    }

    public CityDto() {

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
