package fr.jlaloi.requestmanager.domain;

import javax.persistence.Embeddable;

/**
 * Created by julien on 22/11/15.
 */
@Embeddable
public class RequestStatus {

    public final static RequestStatus CREATED = new RequestStatus("CREATED");
    public final static RequestStatus VALIDATED = new RequestStatus("VALIDATED");
    public final static RequestStatus PLANIFIED = new RequestStatus("PLANIFIED");
    public final static RequestStatus ONSITE = new RequestStatus("ONSITE");
    public final static RequestStatus COMPLETED = new RequestStatus("COMPLETED");
    public final static RequestStatus CLOSED = new RequestStatus("CLOSED");

    private String status;

    public RequestStatus(){
    }

    public RequestStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
