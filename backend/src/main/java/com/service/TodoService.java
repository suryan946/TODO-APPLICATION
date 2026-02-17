package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.model.Todo;
import com.repository.TodoRepository;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public Todo create(Todo todo) {
        return repository.save(todo);
    }

    public List<Todo> getAll(Boolean completed) {
        if (completed != null) {
            return repository.findByCompleted(completed);
        }
        return repository.findAll();
    }

    public Todo update(Long id, Todo updated) {
        Todo todo = repository.findById(id).orElseThrow();
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setCompleted(updated.isCompleted());
        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
