package com.asib27.authentication.UserCloned;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserClonedRepository extends JpaRepository<UserCloned, Long> {
}
