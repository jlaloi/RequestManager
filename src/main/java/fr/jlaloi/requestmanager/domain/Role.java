package fr.jlaloi.requestmanager.domain;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by julien on 22/11/15.
 */
@Entity
public class Role implements GrantedAuthority {

    public final static Role USER = new Role("USER");
    public final static Role ADMIN = new Role("ADMIN");

    @Id
    @GeneratedValue
    private long id;

    private String authority;

    public Role() {
    }

    public Role(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

}
