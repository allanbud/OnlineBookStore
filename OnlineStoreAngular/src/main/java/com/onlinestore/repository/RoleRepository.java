package com.onlinestore.repository;

import com.onlinestore.domain.security.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
