package com.hnqc.member.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user_info")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "open_id")
    private String openId;

    @Column(name = "union_id")
    private String unionId;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "mobile")
    private String mobile;

    private String birthday;

    private String hometown;

    private String avatar;

    private String location;

    private String industry;

    private String occupation;

    private String position;

    private String university;

    private String degree;

    private String academy;

    private String major;

    private String enrollmentTime;

    private Integer authority;

    private Date createTime;

    private Date updateTime;

    private Integer type;

    public UserInfo() {
        super();
    }

    public UserInfo(String name, String openId, String unionId, Integer gender, String mobile, String birthday, String hometown, String avatar, String location, String industry, String occupation, String position, String university, String degree, String academy, String major, String enrollmentTime, Integer authority, Date createTime, Date updateTime, Integer type) {
        super();
        this.name = name;
        this.openId = openId;
        this.unionId = unionId;
        this.gender = gender;
        this.mobile = mobile;
        this.birthday = birthday;
        this.hometown = hometown;
        this.avatar = avatar;
        this.location = location;
        this.industry = industry;
        this.occupation = occupation;
        this.position = position;
        this.university = university;
        this.degree = degree;
        this.academy = academy;
        this.major = major;
        this.enrollmentTime = enrollmentTime;
        this.authority = authority;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.type = type;
    }

    public void copyPropertiesFrom(UserInfo other) {
        if (other.name != null) {
            this.name = other.name;
        }
        if (other.openId != null) {
            this.openId = other.openId;
        }
        if (other.unionId != null) {
            this.unionId = other.unionId;
        }
        if (other.gender != null) {
            this.gender = other.gender;
        }
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnionId() {
        return unionId;
    }

    public void setUnionId(String unionId) {
        this.unionId = unionId;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getAcademy() {
        return academy;
    }

    public void setAcademy(String academy) {
        this.academy = academy;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Integer getAuthority() {
        return authority;
    }

    public void setAuthority(Integer authority) {
        this.authority = authority;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", openId='" + openId + '\'' +
                ", unionId='" + unionId + '\'' +
                ", gender=" + gender +
                ", mobile='" + mobile + '\'' +
                ", birthday='" + birthday + '\'' +
                ", hometown='" + hometown + '\'' +
                ", avatar='" + avatar + '\'' +
                ", location='" + location + '\'' +
                ", industry='" + industry + '\'' +
                ", occupation='" + occupation + '\'' +
                ", position='" + position + '\'' +
                ", university='" + university + '\'' +
                ", degree='" + degree + '\'' +
                ", academy='" + academy + '\'' +
                ", major='" + major + '\'' +
                ", enrollmentTime='" + enrollmentTime + '\'' +
                ", authority=" + authority +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", type=" + type +
                '}';
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEnrollmentTime() {
        return enrollmentTime;
    }

    public void setEnrollmentTime(String enrollmentTime) {
        this.enrollmentTime = enrollmentTime;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
