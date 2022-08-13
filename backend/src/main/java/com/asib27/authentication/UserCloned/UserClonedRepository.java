package com.asib27.authentication.UserCloned;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserClonedRepository extends JpaRepository<UserCloned, Long> {

    @Query(value = "select userid from user_cloned where username = ?1", nativeQuery = true)
    Long findUserId(String name);
}
