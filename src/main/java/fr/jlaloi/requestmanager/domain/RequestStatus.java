package fr.jlaloi.requestmanager.domain;

import javax.persistence.Embeddable;

/**
 * Created by julien on 22/11/15.
 */
@Embeddable
public class RequestStatus {

    public final static RequestStatus CREATED = new RequestStatus("CREATED");
    public final static RequestStatus VALIDATED = new RequestStatus("VALIDATED");

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
