package fr.jlaloi.requestmanager.domain;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

/**
 * Created by julien on 22/11/15.
 */
@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String title;
    private String description;
    private RequestStatus requestStatus;
    private User author;
    private Date createdDate;
    private Date validatedDate;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "addressId")
    private Address address;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<Note> notes;

    public Request(){
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getValidatedDate() {
        return validatedDate;
    }

    public void setValidatedDate(Date validatedDate) {
        this.validatedDate = validatedDate;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Collection<Note> getNotes() {
        return notes;
    }

    public void setNotes(Collection<Note> notes) {
        this.notes = notes;
    }
}
