package fr.jlaloi.requestmanager.domain.repository;

import fr.jlaloi.requestmanager.domain.Request;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by julien on 20/11/15.
 */
@RepositoryRestResource(collectionResourceRel = "request", path = "request")
public interface RequestRepository extends PagingAndSortingRepository<Request, Long> {

}