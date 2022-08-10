package com.asib27.authentication.Writer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WriterRepository extends JpaRepository<Writer, Long> {

    @Query(value = "select b.id from authors as b where b.name = ?1", nativeQuery = true)
    Long findIdByName(String writerName);
}
