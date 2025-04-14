<?php

namespace Tests\Feature;

use Tests\TestCase;
use Inertia\Testing\AssertableInertia;

class HomeControllerTest extends TestCase
{
    public function test_home_page_renders_welcome_component()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Welcome')
        );
    }
} 