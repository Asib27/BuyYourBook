package com.asib27.authentication.Writer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WriterService {
    @Autowired
    WriterRepository writerRepository;

    public Writer addNewWriter(Writer writer) {
        return writerRepository.save(writer);
    }

    public List<Writer> getWriters() {
        return writerRepository.findAll();
    }

    public Writer getAWriter(Long writerId) {
        return writerRepository.findById(writerId).get();
    }

    public Long getWriterIdByName(String writerName) {
        return writerRepository.findIdByName(writerName);
    }
}
